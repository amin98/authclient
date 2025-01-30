import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookAPI from "../../apis/BookAPI";

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await BookAPI.getBook(id);
        setBook(data);
      } catch (err) {
        setError("Failed to fetch book details");
      }
    };

    fetchBook();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 mb-5 bg-transparent ">
      <div className="flex flex-col items-center justify-center gap-5 text-center text-muted-black">
        <h2>{book.title}</h2>
        <img
          src={`http://localhost:3000${book.image}`}
          alt={book.title}
          className="w-32 h-32"
        />
        <p>Author: {book.author}</p>
        <p>{book.description}</p>
      </div>
    
      <PencilSquareIcon className="w-5 h-5 text-muted-black" />
    </div>
  );
};

export default BookDetailsPage;
