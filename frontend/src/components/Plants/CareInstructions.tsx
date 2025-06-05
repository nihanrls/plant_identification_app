import React from 'react';

interface CareInstructionsProps {
  careInstructions?: string;
}

const CareInstructions: React.FC<CareInstructionsProps> = ({ careInstructions }) => {
  if (!careInstructions) return null;
  return (
    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="text-lg font-medium text-green-700 mb-1">Care Instructions</h3>
      <p className="text-green-900 whitespace-pre-line">{careInstructions}</p>
    </div>
  );
};

export default CareInstructions; 