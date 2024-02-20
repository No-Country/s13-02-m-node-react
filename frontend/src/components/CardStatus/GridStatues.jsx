import React from "react";

const GridStatues = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error("Error: 'data' is not an array");
    return null;
  }
  return (
    <div className="w-full grid gap-2 grid-cols-3 grid-rows-4 md:grid-cols-6 md:grid-rows-2">
      {data.map((item, index) => (
        <button
          key={index}
          className="w-10 h-10 flex items-center justify-center border border-rich-black-500 rounded-lg shadow-md shadow-picton-blue-800"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default GridStatues;
