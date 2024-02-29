import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative h-8 max-h-8 w-8 max-w-8 rounded-lg border ${
          currentPage === 1
            ? "text-gray-500 border-gray-500 hover:bg-transparent"
            : "text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-rich-black-500"
        } transition-all`}
        type="button"
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </span>
      </button>
      <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-400">
        Página <strong className="text-white mx-1">{currentPage}</strong>
        de <strong className="text-white ml-1">{totalPages}</strong>
      </p>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`relative h-8 max-h-8 w-8 max-w-8 rounded-lg border ${
          currentPage === totalPages
            ? "text-gray-500 border-gray-500 hover:bg-transparent"
            : "text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-rich-black-500"
        } transition-all `}
        type="button"
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Pagination;
