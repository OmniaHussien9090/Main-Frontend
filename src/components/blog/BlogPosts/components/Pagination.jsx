import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="flex items-center justify-center gap-x-1 mt-6">
      <button
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
      >
        <svg
          className="shrink-0 w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18L9 12L15 6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <div className="flex items-center gap-x-1">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center border ${
                isActive
                  ? "border-gray-200 text-gray-800 bg-gray-100"
                  : "border-transparent text-gray-800 hover:bg-gray-100"
              } py-2 px-3 text-sm rounded-lg cursor-pointer font-medium`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
      >
        <span className="sr-only">Next</span>
        <svg
          className="shrink-0 w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18L15 12L9 6"></path>
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;