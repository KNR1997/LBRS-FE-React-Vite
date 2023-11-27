import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div className="loading-spinner">
      <ClipLoader color="#36D7B7" loading={isLoading} size={150} />
    </div>
  );
}

export default LoadingSpinner;
