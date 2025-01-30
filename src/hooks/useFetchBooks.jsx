import { useState, useEffect, useCallback } from 'react';
import BookAPI from '../apis/BookAPI';

export const useFetchBooks = (searchQuery = '') => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      if (searchQuery) {
        response = await BookAPI.getBooksByName(searchQuery);
      } else {
        response = await BookAPI.getBooks();
      }
      setBooks(response || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError(`Error fetching books: ${error.message}`);
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, error, refreshBooks: fetchBooks };
};
