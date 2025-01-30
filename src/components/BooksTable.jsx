import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import BookAPI from "../apis/BookAPI";
import CreateBookModal from "../components/modals/CreateBookModal";
import EditBookModal from "../components/modals/EditBookModal";

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await BookAPI.getBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  // Open Edit Modal
  const openEditModal = (book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  // Open Delete Modal
  const openDeleteModal = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  // Handle Delete Book
  const handleDelete = async () => {
    if (!bookToDelete) return;

    try {
      await BookAPI.deleteBook(bookToDelete._id);
      fetchBooks();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  return (
    <div className="p-5 text-white">
      {/* Create Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Books Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          + Add New Book
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-600">Cover</th>
              <th className="p-3 border border-gray-600">Title</th>
              <th className="p-3 border border-gray-600">Author</th>
              <th className="p-3 border border-gray-600">Description</th>
              <th className="p-3 border border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="bg-gray-700 text-center">
                <td className="p-3 border border-gray-600">
                  <img
                    src={`http://localhost:3000${book.image}`}
                    alt={book.title}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-3 border border-gray-600">{book.title}</td>
                <td className="p-3 border border-gray-600">{book.author}</td>
                <td className="p-3 border border-gray-600">{book.description}</td>
                <td className="p-3 border border-gray-600 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(book)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(book)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Book Modal */}
      {isCreateModalOpen && (
        <CreateBookModal onClose={() => setIsCreateModalOpen(false)} refreshBooks={fetchBooks} />
      )}

      {/* Edit Book Modal */}
      {isEditModalOpen && selectedBook && (
        <EditBookModal book={selectedBook} onClose={() => setIsEditModalOpen(false)} refreshBooks={fetchBooks} />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Transition appear show as={React.Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setIsDeleteModalOpen(false)}>
            <TransitionChild enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 flex items-center justify-center">
              <TransitionChild enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <DialogPanel className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
                  <DialogTitle className="text-xl font-bold text-gray-800">Confirm Deletion</DialogTitle>
                  <p className="text-gray-700 mt-2">Are you sure you want to delete "{bookToDelete?.title}"?</p>

                  <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                      Cancel
                    </button>
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default BooksTable;
