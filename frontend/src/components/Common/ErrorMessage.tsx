import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 text-center">
        <p className="text-xl font-semibold">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 