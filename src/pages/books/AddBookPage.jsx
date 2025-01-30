import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAPI from "../../apis/BookAPI";
import { userStatusContext } from "../../components/contexts/UserStatus";

const AddBookPage = () => {
  const { user } = useContext(userStatusContext); // Correctly use the context
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    bookImage: null,
  });
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.role !== "emperor") {
      setError("You do not have permission to add books");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      await BookAPI.createBook(data);
      navigate("/");
    } catch (err) {
      setError("Failed to add book");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-muted-black ">Add Book</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5 mx-10">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-1"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="p-1"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="bookImage"
          accept="image/*"
          className="text-muted-black"
          onChange={handleChange}
        />
        <button type="submit" className="text-muted-black">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
