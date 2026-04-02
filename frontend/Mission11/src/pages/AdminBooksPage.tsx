import { useEffect, useState } from 'react';
import { type Book } from '../types/book';
import { deleteBook } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [pageSize, setPageSize] = useState<number>(10);
	const [pageNum, setPageNum] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [showForm, setShowForm] = useState(false);
	const [editingBook, setEditingBook] = useState<Book | null>(null);

	const fetchBooks = async (size: number, page: number) => {
		const response = await fetch(
			`https://localhost:5000/api/Book?pageSize=${size}&pageNumber=${page}`
		);

		if (!response.ok) {
			throw new Error('Failed to load books');
		}

		return response.json();
	};

	const loadBooks = async () => {
		try {
			setLoading(true);
			const data = await fetchBooks(pageSize, pageNum);
			setBooks(data.books ?? []);
			setTotalPages(Math.ceil((data.totalCount ?? 0) / pageSize));
			setError(null);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadBooks();
	}, [pageSize, pageNum]);

	const handleDelete = async (bookId: number) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this book?'
		);
		if (!confirmDelete) return;

		try {
			await deleteBook(bookId);
			setBooks(books.filter((b) => b.bookId !== bookId));
		} catch {
			alert('Failed to delete book. Please try again.');
		}
	};

	if (loading) return <p>Loading books...</p>;
	if (error) return <p className="text-red-500">Error: {error}</p>;

	return (
		<div>
			<h1>Admin - Books</h1>

			{!showForm && (
				<button
					className="btn btn-success mb-3"
					onClick={() => setShowForm(true)}
				>
					Add Book
				</button>
			)}

			{showForm && (
				<NewBookForm
					onSuccess={() => {
						setShowForm(false);
						loadBooks();
					}}
					onCancel={() => setShowForm(false)}
				/>
			)}

			{editingBook && (
				<EditBookForm
					book={editingBook}
					onSuccess={() => {
						setEditingBook(null);
						loadBooks();
					}}
					onCancel={() => setEditingBook(null)}
				/>
			)}

			<table className="table table-bordered table-striped">
				<thead className="table-dark">
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Author</th>
						<th>Publisher</th>
						<th>ISBN</th>
						<th>Classification</th>
						<th>Category</th>
						<th>Page Count</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{books.map((b) => (
						<tr key={b.bookId}>
							<td>{b.bookId}</td>
							<td>{b.title}</td>
							<td>{b.author}</td>
							<td>{b.publisher}</td>
							<td>{b.isbn}</td>
							<td>{b.classification}</td>
							<td>{b.category}</td>
							<td>{b.pageCount}</td>
							<td>${b.price?.toFixed(2)}</td>
							<td>
								<button
									className="btn btn-primary btn-sm w-100 mb-1"
									onClick={() => setEditingBook(b)}
								>
									Edit
								</button>
								<button
									className="btn btn-danger btn-sm w-100"
									onClick={() => handleDelete(b.bookId)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="d-flex justify-content-between align-items-center">
				<div>
					<button
						className="btn btn-outline-secondary me-2"
						disabled={pageNum === 1}
						onClick={() => setPageNum((prev) => prev - 1)}
					>
						Previous
					</button>
					<button
						className="btn btn-outline-secondary"
						disabled={pageNum === totalPages || totalPages === 0}
						onClick={() => setPageNum((prev) => prev + 1)}
					>
						Next
					</button>
				</div>

				<div>
					<span className="me-3">
						Page {pageNum} of {totalPages || 1}
					</span>
					<label>
						Results per page:
						<select
							className="form-select d-inline-block w-auto ms-2"
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
								setPageNum(1);
							}}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
						</select>
					</label>
				</div>
			</div>
		</div>
	);
};

export default AdminBooksPage;
