import BookAPI from "../apis/BookAPI"
import { useState, useEffect } from "react";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await BookAPI.getBooks();
                setBooks(data);
            } catch (err) {
                setError("Failed to fetch books");
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Books</h2>
            {error && <p>{error}</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default BooksPage;