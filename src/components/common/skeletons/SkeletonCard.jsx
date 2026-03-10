import React from "react";

const SkeletonCard = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md h-96 flex flex-col animate-pulse">
      <div className="bg-gray-200 rounded-xl h-68 w-full mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonCard;