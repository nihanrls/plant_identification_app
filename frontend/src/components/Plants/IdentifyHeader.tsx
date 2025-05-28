import React from 'react';
import PageHeader from '../Common/PageHeader';
import LoadingSpinner from '../Common/LoadingSpinner';

interface IdentifyHeaderProps {
  loading: boolean;
}

const IdentifyHeader: React.FC<IdentifyHeaderProps> = ({ loading }) => {
  return (
    <>
      <PageHeader title="Identify Plant" />
      
      {loading && (
        <div className="bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
          <LoadingSpinner />
          <p className="text-lg text-gray-600">Please wait while we identify your plant...</p>
        </div>
      )}
    </>
  );
};

export default IdentifyHeader; 