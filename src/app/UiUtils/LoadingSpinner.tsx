// src/app/UIUtils/LoadingSpinner.tsx
'use client';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-blue-600 border-t-transparent rounded-full" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
