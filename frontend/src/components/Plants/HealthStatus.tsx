import React from 'react';

interface HealthStatusProps {
  diseaseName?: string;
  diseaseProbability?: number;
  diseaseDetails?: string;
}

const HealthStatus: React.FC<HealthStatusProps> = ({
  diseaseName,
  diseaseProbability,
  diseaseDetails,
}) => {
  return (
    <div className="mt-8 p-4 rounded-lg border">
      <h2 className="text-xl font-semibold mb-2">Health Status</h2>
      {diseaseName ? (
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-medium text-red-700 mb-1">Detected Disease, Please consult a professional</h3>
            <p className="text-red-600">{diseaseName}</p>
          </div>
          {diseaseProbability && (
            <div>
              <h3 className="text-lg font-medium text-red-700 mb-1">Confidence</h3>
              <p className="text-red-600">
                {(diseaseProbability * 100).toFixed(1)}% probability
              </p>
            </div>
          )}
          {diseaseDetails && (
            <div>
              <h3 className="text-lg font-medium text-red-700 mb-1">Details</h3>
              <p className="text-red-600">{diseaseDetails}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-green-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-lg">No diseases detected. Your plant appears to be healthy!</p>
        </div>
      )}
    </div>
  );
};

export default HealthStatus; 