import React from "react";

const TableSkeleton = () => {
  return (
    <div className="p-2 bg-white w-full rounded-4xl shadow-md h-screen flex animate-pulse">
      <div className="flex  w-full max-w-6xl flex-col p-3 gap-2">
        <ul className="rounded-xl bg-gray-200 p-1">
          <div className="flex p-3 gap-4">
              <li className="h-6 rounded-full bg-white  w-6" />
              <li className="h-6 rounded-xl bg-white flex-1" />
              <li className="h-6 rounded-xl bg-white  w-30" />
              <li className="h-6 rounded-xl bg-white  w-44" />
              <li className="h-6 rounded-xl bg-white  w-24" />
            </div>
        </ul>
        <ul>
          {Array.from({ length: 14 }).map((_, index) => (
            <div className="flex p-3 gap-4" key={index}>
              <li className="h-6 rounded-full bg-gray-200  w-6" />
              <li className="h-6 rounded-xl bg-gray-200  flex-1" />
              <li className="h-6 rounded-xl bg-gray-200  w-30" />
              <li className="h-6 rounded-xl bg-gray-200  w-44" />
              <li className="h-6 rounded-xl bg-gray-200  w-24" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableSkeleton;
