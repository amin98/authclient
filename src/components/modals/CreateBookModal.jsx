/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild
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

const CreateBookModal = ({ onClose, refreshBooks }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    bookImage: null,
  });

  const handleInput = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewBook({ ...newBook, bookImage: file });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const key in newBook) {
        formData.append(key, newBook[key]);
      }

      await BookAPI.createBook(formData);
      refreshBooks(); // Refresh the books list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating book:", error);
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
                  Add a New Book
                </DialogTitle>

                <form onSubmit={handleSave} className="flex flex-col mt-4 space-y-4">
                  <InputField label="Title" id="title" type="text" value={newBook.title} onChange={handleInput} placeholder="Enter book title" required />
                  <InputField label="Author" id="author" type="text" value={newBook.author} onChange={handleInput} placeholder="Enter author name" required />
                  <TextAreaField label="Description" id="description" value={newBook.description} onChange={handleInput} placeholder="Enter book description" rows={4} required />

                  <div className="w-full space-y-2">
                    <label htmlFor="bookImage" className="inline-block text-lg font-medium text-gray-800 mt-2.5">
                      Upload Book Cover
                    </label>
                    <input id="bookImage" type="file" className="block w-full px-3 py-2 text-lg border border-gray-200 rounded-lg" onChange={handleFileChange} />
                  </div>

                  <div className="flex justify-end mt-5 space-x-4">
                    <button type="button" className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600">
                      Save Book
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

export default CreateBookModal;
