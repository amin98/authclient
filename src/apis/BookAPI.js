import RequestHandler from './RequestHandler';

const BookAPI = {
    createBook: async (bookData) => {
      const res = await RequestHandler.post("/api/books", bookData);
      return res.data;
    },
    getBooks: async () => {
      const res = await RequestHandler.get("/api/books");
      return res.data;
    },
    getBook: async (id) => {
      const res = await RequestHandler.get(`/api/books/${id}`);
      return res.data;
    },
    deleteBook: async (id) => {
      const res = await RequestHandler.del(`/api/books/${id}`);
      return res.data;
    },
  };

export default BookAPI;