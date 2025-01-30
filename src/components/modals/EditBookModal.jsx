import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import React, { useState } from "react";
import BookAPI from "../../apis/BookAPI";

const InputField = ({ label, id, type, value, onChange, placeholder, required = false }) => (
  <div className="w-full space-y-2">
    <label htmlFor={id} className="inline-block text-lg font-medium text-gray-800 mt-2.5">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="block w-full px-3 py-2 text-lg border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-secondary"
      placeholder={placeholder}
      required={required}
      value={value || ""}
      onChange={onChange}
      name={id}
    />
  </div>
);

const TextAreaField = ({ label, id, value, onChange, placeholder, rows }) => (
  <div className="w-full space-y-2">
    <label htmlFor={id} className="inline-block text-lg font-medium text-gray-800 mt-2.5">
      {label}
    </label>
    <textarea
      id={id}
      className="w-full px-3 py-2 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
      rows={rows}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      name={id}
    />
  </div>
);

const EditBookModal = ({ book, onClose, refreshBooks }) => {
  const [updatedBook, setUpdatedBook] = useState({
    title: book.title || "",
    author: book.author || "",
    description: book.description || "",
    bookImage: null, // Image will be uploaded if changed
  });

  const handleInput = (event) => {
    setUpdatedBook({
      ...updatedBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpdatedBook({ ...updatedBook, bookImage: file });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const key in updatedBook) {
        if (updatedBook[key]) {
          formData.append(key, updatedBook[key]);
        }
      }

      await BookAPI.updateBook(book._id, formData);
      refreshBooks();
      onClose();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <Transition appear show as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild as={React.Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <TransitionChild as={React.Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                  Edit Book
                </DialogTitle>

                <form onSubmit={handleUpdate} className="flex flex-col mt-4 space-y-4">
                  <InputField label="Title" id="title" type="text" value={updatedBook.title} onChange={handleInput} required />
                  <InputField label="Author" id="author" type="text" value={updatedBook.author} onChange={handleInput} required />
                  <TextAreaField label="Description" id="description" value={updatedBook.description} onChange={handleInput} rows={4} required />

                  <div className="w-full space-y-2">
                    <label htmlFor="bookImage">Upload New Book Cover</label>
                    <input id="bookImage" type="file" onChange={handleFileChange} />
                  </div>

                  <div className="flex justify-end mt-5 space-x-4">
                    <button type="button" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600">
                      Update Book
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditBookModal;
