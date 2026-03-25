import { useEffect, useState } from 'react';
import './BookList.css';
import type { Book } from '../types/book';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [PageSize, setPageSize] = useState<number>(10);
  const [PageNumber, setPageNumber] = useState<number>(1);
  const [TotalItems, setTotalItems] = useState<number>(0);
  const [TotalPages, setTotalPages] = useState<number>(0);
  const [SortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${PageSize}&pageNumber=${PageNumber}&sortOrder=${SortOrder}&${selectedCategories.length > 0 ? categoryParams : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalCount);
      const calculatedPages = Math.ceil(data.totalCount / PageSize);
      setTotalPages(calculatedPages);
    };
    fetchBooks();
  }, [PageSize, PageNumber, SortOrder, selectedCategories]);

  return (
    <>
      <h1>Book List</h1>
<div className="book-controls mb-3">
  <label htmlFor="sortOrder" className="form-label me-2 mb-0">
    Sort by title:
  </label>
  <select
    id="sortOrder"
    className="form-select w-auto"
    value={SortOrder}
    onChange={(e) => {
      setSortOrder(e.target.value as 'asc' | 'desc');
      setPageNumber(1);
    }}
  >
    <option value="asc">A to Z</option>
    <option value="desc">Z to A</option>
  </select>
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
              <button
                className="btn btn-primary"
                onClick={() => {
                  addToCart({
                    BookId: b.bookId,
                    title: b.title,
                    price: b.price,
                  });
                  navigate('/cart');
                }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="book-pagination">
        <nav aria-label="Book pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${PageNumber === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPageNumber((prev) => prev - 1)}
                disabled={PageNumber === 1}
              >
                Previous
              </button>
            </li>

            {[...Array(TotalPages)].map((_, i) => (
              <li
                key={i + 1}
                className={`page-item ${PageNumber === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPageNumber(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${PageNumber === TotalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={PageNumber === TotalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <label className="mt-2">
          Results per page:
          <select
            className="form-select w-auto d-inline-block ms-2"
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
