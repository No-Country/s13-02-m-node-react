'use client'
import React from "react";

const Pet = ({ className }) => {
  const handlePetClick = () => {
    window.location.href = '/' // Redirige a la página de inicio cuando se hace clic en Pet
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Capa 1"
      viewBox="0 0 1080 1076.23"
      className={`fill-white ${className} cursor-pointer ml-0`}
      onClick={handlePetClick}
    >
      <path
        d="M640.6 237.37c-.98 1.02-.74 1.72.7 2.11.77 5.19 1.94 10 3.52 14.44-.37.39-.6.86-.71 1.41 1.07 2.88 2.24 5.69 3.52 8.45-.76 10.6 7.31 22.13 6.33 33.81 81.77 40.38 163.49 88.13 234.57 146.15 61.3 54.1 78.54 131.88 76.66 210.61 17.6-1.79 119.5-59.78 114.65-28.18-31.63 23.79-77.64 30.46-114.29 47.56-1.59 8.04.93 17.27.7 25.7 16.38 2.94 118.86-26.12 105.15 3.52-32.29 13.08-72.37 8.96-107.26 15.5 8.4 159.52-149.55 230.03-268.68 294.07-49.93 30.5-98.31 69.25-160.36 63.04-117.04.16-223.74-110.24-327.06-160.94-77.78-45.74-106.31-107.88-111.47-196.18-1.57-65.55-6.58-134.69 16.52-197.22-.58-.63-1.28-.86-2.11-.71-18.88-33.48-26.74-73.5-43.26-107.76-8.3-27.35-21.01-53.42-29.54-81-.7-.4-1.29-.87-1.76-1.41 1.88-.47 1.88-.94 0-1.41C26.63 291.29-2.68 250.15.2 212.02c24.15-33.79 57.77 1.5 78.43 19.72 12.45 4.76 20.97 18.43 33.76 23.24 1.36 4.43 7.68 7.52 11.96 9.16 2.71 4.64 10.25 9.88 15.47 11.97 5.31 6.86 15.34 12.25 22.51 18.31 0 .94.47 1.41 1.41 1.41 1.79 1.52 5.93 2 5.63 4.93 1.95.07 3.36 1.01 4.22 2.82 1.78 1.19 3.66 2.25 5.63 3.17.88 3.11 5.85 2.78 5.63 5.99 4.25 1.63 10.45 5 11.96 9.16 3.98 1.26 10.54 5.23 11.96 9.16 1.74.11 3.14.81 4.22 2.11 0 .94.47 1.41 1.41 1.41 9.77 5.69 17.91 15.47 28.13 19.72.57 2.09 1.97 3.38 4.22 3.87 2.02 2.59 4.59 4.35 7.74 5.28 4.2 7.76 15.97 11.33 24.62 12.33 57.54-38.39 116.51-75.06 182.52-96.85.13-1.97-.46-3.73-1.76-5.28-.6-7.93 2.71-18.43-2.11-25.36.96-1.37.72-2.54-.7-3.52.37-.39.6-.86.7-1.41-1.34-2.15-1.81-4.39-1.4-6.69a3.15 3.15 0 00-1.41-1.06c-2.06-10.99-4.3-23.93-8.44-34.51l.7-.7a97.11 97.11 0 01-2.82-9.86c.23-.23.47-.47.71-.7-1.4-.43-1.63-1.13-.71-2.11-1.42-.98-1.66-2.16-.7-3.52-2.65-3.31-1.33-7.89-4.22-11.27-.61-13.51-7.02-26.38-8.44-40.15l-1.41-1.41c.17-1.47.17-2.88 0-4.23-1.14-.6-1.38-1.31-.7-2.11-1.54-3.36-2.44-6.86-2.11-10.57-1.39-.43-1.63-1.13-.7-2.11-1.42-.98-1.66-2.16-.7-3.52-.86-2.5-2.03-5.09-3.52-7.75.92-6.54-2.02-12.1-4.22-18.31.69-1.25.45-2.43-.71-3.52.23-.23.47-.47.71-.7-1.31-2.53-1.77-5.12-1.41-7.75-1.32-2.8-2.5-5.74-3.52-8.8.15-.41.38-.76.71-1.06-1.66-5.44-3.3-10.84-4.93-16.2.23-.7.47-1.41.7-2.11-1.39-.43-1.63-1.13-.7-2.11l-1.41-1.41C402.12 22.84 405.26 8.1 422.23.73c.7.23 1.41.47 2.11.7l2.82-1.41c4.92.39 9.5 2.16 13.72 5.28-.23.23-.47.47-.71.7a76.76 76.76 0 007.74 5.28c14.43 20.53 40.34 35.71 54.86 56.35 25.06 20.62 47.96 48.1 74.55 71.49l-.7.7c6.17 3.58 10.49 12.62 17.58 15.14 8.56 14.15 26.93 23.1 35.17 38.39-.23.7-.47 1.41-.71 2.11 1.62 2.93 3.03 5.98 4.22 9.16-.23.23-.47.47-.71.7 3.01 11.11 5.82 21.79 8.44 32.05zM467.57 83.11c43.98 44.47 84.2 83.42 128.01 125.73-.23.23-.47.47-.71.7 2.44 4.38 4.46 12.33 4.22 16.91 1.76 4.34 3.17 8.57 4.22 12.68-.93.98-.69 1.69.7 2.11-.42 1.15-.19 2.32.7 3.52-.42 3.32.65 6.22 2.11 9.16-.67.81-.44 1.51.71 2.11-.15 9.04 4.9 17.61 5.27 26.41-20.93-6.1-43.06-7.94-63.65-14.79-.41.15-.76.38-1.06.7-4.43-.89-9.12-2.29-14.07-4.23l-.7.7c-1.09-1.16-2.27-1.39-3.52-.7-7.21-2.29-14.47-4.4-21.8-6.34-.29.32-.64.56-1.06.7-3.06-.87-5.99-2.04-8.79-3.52-.74-7.87-5.87-16.6-5.28-24.3-3.54-4.07-1.47-10.33-4.92-14.79.23-.7.47-1.41.7-2.11-1.35-3.46-2.52-6.98-3.52-10.57.23-.23.47-.47.71-.7-.67-1.21-1.38-2.38-2.11-3.52.11-.79.35-1.61.7-2.47a3.15 3.15 0 00-1.41-1.06c.23-.23.47-.47.71-.7-3.12-8.68-3.69-17.61-7.04-26.06l.7-.7c-1.21-2.83-2.15-5.53-2.81-8.1.15-.41.38-.76.7-1.06-.85-3.73-2.02-7.25-3.52-10.57.67-.81.44-1.51-.7-2.11-.42-2.04-.42-3.92 0-5.63-1.17-2.58-2.34-5.16-3.52-7.75.69-1.25.46-2.43-.7-3.52.45-2.11.87-4.82-1.41-5.63.23-.23.47-.47.71-.7-2.73-14.54-9.13-29.62-10.55-45.08-1.14-.6-1.38-1.3-.7-2.11-1.18-2.11-1.76-4.35-1.76-6.69 4.5 5.09 9.3 9.79 14.42 14.09zM59.64 262.73c64.85 43.77 124.42 98.38 187.44 145.8-1.85 46.47-17.36 93.15-24.61 139.46-6.6 14.69-71.19-52.11-85.11-59.17-27.4-74.13-54.37-148.32-80.88-222.58.72-1.54 1.78-2.71 3.16-3.52zm462.79 43.67c79.14-.26 151.58 38.23 218.04 78.54 68.85 45.95 152.71 86.52 180.05 170.81-70.55-8.9-59.16 102.29 8.09 78.18-.18 11.34 1.99 22.93.35 34.16-19.17 12.24-147.42 41.42-128.71 64.44 40.29 7.37 86.6-8.82 128.71-9.5-2.44 176.86-208.28 215.66-324.24 303.58-130.45 54.82-241.37-70.1-348.86-126.08-43.31-24.42-87.1-52.83-109.01-98.97-20.15-83.07-23.63-172.6-4.22-256.04 14.89 8.16 26 21.74 40.79 29.58 17.45 18.99 55.19 40.99 71.39 8.8 10.4-56.65 21.19-113.23 32.35-169.75 72.28-46.28 146.7-103.21 235.27-107.77zm406.54 381.06c1.38 5.11 1.85 10.52 1.4 16.2-19.43 2.4-38.89 4.4-58.37 5.99 19.14-7.2 38.13-14.6 56.97-22.19zm-156.85 48.6c34.47-3.27 2.27 47.63 2.82 65.86 4.23 14.67 12.84 28.1 17.93 42.62-8.36 38.6-30.05-22.51-35.17-33.81-83.08-39.8-43.93-44.4 14.42-74.66zm-204.67 12.68c64.81-7.67 61.19 89.39-2.11 78.54-41.31-9.85-36.33-69.1 2.11-78.54zm117.46 42.97c9.89-.15 13.53 4.54 10.9 14.09-57.09 56.23-113.94 112.7-170.56 169.4-6.81 6.57-12.56 5.75-17.23-2.46 35.7-53.64 96.47-95.99 140.32-145.8a10003.66 10003.66 0 00-155.44 59.52c-10.85.64-14.49-4.18-10.9-14.44 66.15-29.66 135.83-52.64 202.91-80.29z"
        style={{ isolation: "isolate" }}
        fillRule="evenodd"
        strokeWidth="0"
        opacity="0.95"
      ></path>
    </svg>
  );
};

export default Pet;
