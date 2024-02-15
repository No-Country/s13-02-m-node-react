import React, { useState, useEffect } from "react";

const Logo = ({ size }) => {
  const text = "NEKODE";
  const [displayedText, setDisplayedText] = useState("");
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      const interval = setInterval(() => {
        setHovered(true);
        setTimeout(() => {
          setHovered(false);
          setDisplayedText("NEKODE");
        }, 1000);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isDesktop]);

  useEffect(() => {
    const letters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (hovered) {
      let iteration = 0;
      const interval = setInterval(() => {
        const newText = displayedText
          .split("")
          .map((letter, index) => {
            if (letter === " ") {
              return " ";
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        setDisplayedText(newText);

        if (iteration >= displayedText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    } else {
      if (text !== "") {
        const interval = setInterval(() => {
          if (displayedText.length < text.length) {
            setDisplayedText((prev) => prev + text[displayedText.length]);
          } else {
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, [hovered, displayedText, text]);

  const handleMouseOver = () => {
    if (isDesktop) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setHovered(false);
      setDisplayedText("NEKODE");
    }
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-center gap-x-2.5 lg:gap-x-5 text-white"
    >
      {text.split("").map((border, index) => (
        <div
          key={index}
          className={`p-5 w-7 h-8 flex justify-center items-center border-gray-500 ${
            border === " " ? "none" : "border"
          } ${size}`}
        >
          <span
            className={`${
              hovered === true
                ? "animate-entry text-gray-500"
                : "animate-entry text-white"
            }`}
          >
            {displayedText[index] || "\u00A0"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Logo;
