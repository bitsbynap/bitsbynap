import React from "react";

const DynamicGrid = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="text-center text-gray-500">No clients to display</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center bg-white rounded-lg shadow p-4 hover:shadow-md transition"
        >
          <img
            src={item.image}
            alt={`Client ${index + 1}`}
            className="max-h-24 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicGrid;
