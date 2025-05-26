import React from 'react';

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
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
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