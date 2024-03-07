import React from "react";

const GridStatues = ({ data, onClick }) => {
  if (!Array.isArray(data)) {
    console.error("Error: 'data' is not an array");
    return null;
  }

  const handleClick = (item) => {
    onClick(item);
  };

  return (
    <div className="w-full grid gap-2 grid-cols-3 grid-rows-4 xl:grid-cols-6 xl:grid-rows-2 place-items-center">
      {data.map((item, index) => (
        <button
          key={index}
          className="w-10 h-10 flex items-center justify-center border border-rich-black-500 rounded-lg shadow-md shadow-picton-blue-800 place-self-center"
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default GridStatues;
