import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPages, currentPage, handlePageChange }) => (
  <nav
    className='relative z-0 inline-flex gap-5 -space-x-px'
    aria-label='Pagination'
  >
    <button
      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 '
    >
      <span className='sr-only'>Previous</span>
      <ChevronLeftIcon className='w-5 h-5' />
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={`px-3 py-1 border rounded-full ${
          currentPage === i + 1
            ? 'bg-secondary text-primary'
            : 'bg-white text-primary hover:bg-gray-200'
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 '
    >
      <span className='sr-only'>Next</span>
      <ChevronRightIcon className='w-5 h-5' />
    </button>
  </nav>
);

export default Pagination;
