"use client";
import React from "react";
import { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const pingAnimation = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const AnimatedHeart = styled(FavoriteRoundedIcon)`
  animation: ${pingAnimation} 1s cubic-bezier(0, 0, 0.2, 1);
`;

const HeartCounter = ({ lives }) => {
  const [currentHeartIndex, setCurrentHeartIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    let interval;

    const startAnimation = () => {
      interval = setInterval(() => {
        setCurrentHeartIndex(index);
        index = (index + 1) % lives;

        if (index === 0 && lives > 1) {
          clearInterval(interval);
          setTimeout(() => {
            startAnimation();
          }, 5000);
        }
      }, 1000);
    };

    if (lives > 0) {
      startAnimation();
    }

    return () => clearInterval(interval);
  }, [lives]);

  const heartIcons = [];

  for (let i = 0; i < 3; i++) {
    if (i < lives) {
      let animateClass = "";

      if (lives === 1 || (i === 0 && lives > 1)) {
        animateClass = "animate-ping";
      }

      heartIcons.push(
        <span key={i} className="relative inline-flex w-6 h-6">
          {i === currentHeartIndex && (
            <AnimatedHeart
              className={`absolute ${animateClass} text-indigo-500 w-full h-full`}
            />
          )}
          <FavoriteRoundedIcon className="relative text-indigo-500 w-full h-full" />
        </span>
      );
    } else {
      heartIcons.push(
        <FavoriteBorderRoundedIcon
          key={i}
          className="text-indigo-500 w-6 h-6"
        />
      );
    }
  }


  return <div className="flex space-x-2 fixed ml-[4%] mt-[120px]">{heartIcons}</div>;

};

export default HeartCounter;
