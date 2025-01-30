import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookAPI from "../../apis/BookAPI";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BookAPI.getBooks();
        console.log("Books", data);
        setBooks(data);
      } catch (err) {
        setError("Failed to fetch books");
      }
    };

    fetchBooks();
  }, []);

return (
    <div className="text-muted-black">
        <h2>Books</h2>
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
                <div
                    key={book._id}
                    className="flex flex-col items-center gap-5 p-5 mb-5 bg-transparent border-2 rounded-lg"
                >
                    <img
                        src={`http://localhost:3000${book.image}`}
                        alt={book.title}
                        className="w-32 h-32"
                    />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                    <Link to={`/books/${book._id}`} className="text-blue-500">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    </div>
);
};

export default BooksPage;