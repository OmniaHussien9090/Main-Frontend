import React from "react";

const LoadingSkeleton = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="mb-12 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;