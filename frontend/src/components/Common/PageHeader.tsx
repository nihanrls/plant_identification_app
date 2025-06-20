import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, actionButton }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src="/plantifylogo.png" alt="Plantify Logo" style={{ height: 40 }} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
};

export default PageHeader; 