import React from "react";

const LoadingIndicator = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
    <p>Loading...</p>
  </div>
);

export default LoadingIndicator;