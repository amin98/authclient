import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAPI from "../apis/BookAPI";

const AddBookPage = () => {
    
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    bookImage: null, 
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      await BookAPI.createBook(data);
      navigate("/");
    } catch (err) {
      setError("Failed to create book");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-2xl text-white">Add Book</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <label htmlFor="bookImage" className="block mb-1">
            Upload Book Image
          </label>
          <input
            type="file"
            name="bookImage"
            id="bookImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <button type="submit" className="p-2 text-white bg-blue-500 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
