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
          className="group relative flex items-center justify-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <img
            src={item.image}
            alt={`Client ${index + 1}`}
            className="max-h-24 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicGrid;
