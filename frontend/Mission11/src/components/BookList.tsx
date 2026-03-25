import { useEffect, useState } from 'react';
import './BookList.css';
import type { Book } from '../types/book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [PageSize, setPageSize] = useState<number>(10);
  const [PageNumber, setPageNumber] = useState<number>(1);
  const [TotalItems, setTotalItems] = useState<number>(0);
  const [TotalPages, setTotalPages] = useState<number>(0);
  const [SortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${PageSize}&pageNumber=${PageNumber}&sortOrder=${SortOrder}`,
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalCount);
      const calculatedPages = Math.ceil(data.totalCount / PageSize);
      setTotalPages(calculatedPages);
    };
    fetchBooks();
  }, [PageSize, PageNumber, SortOrder]);

  return (
    <>
      <h1>Book List</h1>
      <div className="book-controls">
        <label>
          Sort by title:
          <select
            value={SortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as 'asc' | 'desc');
              setPageNumber(1);
            }}
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </label>
      </div>
      <br />
      <div className="book-card-container">
        {books.map((b) => (
          <div id="bookCard" className="card book-card" key={b.bookId}>
            <h3 className="card-title">{b.title}</h3>
            <div className="card-body">
              <ul className="list-unstyled book-details-list">
              <li>
                {' '}
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                {' '}
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                {' '}
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                {' '}
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price?.toFixed(2)}
              </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="book-pagination">
        <button
          disabled={PageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Previous
        </button>

        {[...Array(TotalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPageNumber(i + 1)}
            disabled={PageNumber === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={PageNumber === TotalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
        <br />
        <label>
          {' '}
          Results per page:
          <select
            value={PageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookList; 