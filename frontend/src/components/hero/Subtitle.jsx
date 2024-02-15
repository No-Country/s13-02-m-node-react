import React from "react";

const Subtitle = () => {
  return (
    <div className="flex items-center justify-center gap-2.5 md:gap-10">
      <svg
        className="fill-indigo-500 h-5 md:h-9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path d="M64 120c0-48.6 39.4-88 88-88h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-22.1 0-40 17.9-40 40v45.5c0 23.3-9.3 45.7-25.8 62.2L57.9 256l28.3 28.3c16.5 16.5 25.8 38.9 25.8 62.2V392c0 22.1 17.9 40 40 40h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-48.6 0-88-39.4-88-88V346.5c0-10.6-4.2-20.8-11.7-28.3L7 273c-9.4-9.4-9.4-24.6 0-33.9l45.3-45.3c7.5-7.5 11.7-17.7 11.7-28.3V120z" />
      </svg>

      <h1 className="text-white text-lg md:text-3xl whitespace-nowrap">
        Descubre tu nivel dev
      </h1>

      <svg
        className="fill-indigo-500 h-5 md:h-9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 512"
      >
        <path d="M192 120c0-48.6-39.4-88-88-88H56C42.7 32 32 42.7 32 56s10.7 24 24 24h48c22.1 0 40 17.9 40 40v45.5c0 23.3 9.3 45.7 25.8 62.2L198.1 256l-28.3 28.3c-16.5 16.5-25.8 38.9-25.8 62.2V392c0 22.1-17.9 40-40 40H56c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c48.6 0 88-39.4 88-88V346.5c0-10.6 4.2-20.8 11.7-28.3L249 273c9.4-9.4 9.4-24.6 0-33.9l-45.3-45.3c-7.5-7.5-11.7-17.7-11.7-28.3V120z" />
      </svg>
    </div>
  );
};

export default Subtitle;
