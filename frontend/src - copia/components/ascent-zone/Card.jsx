import React from "react";
import { Avatar, Badge, Skeleton, styled } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 65,
      height: 65,
    },
    children: initials,
  };
}

export const Card = ({ data, dataLoaded }) => {
  return (
    <div className="max-w-2xl w-full flex items-center justify-between gap-5 bg-jet-500 p-5 rounded-xl shadow-md shadow-picton-blue-800 text-indigo-500">
      <div className="w-full flex items-center gap-5">
        {dataLoaded ? (
          <Skeleton variant="circular" width={65} height={65} />
        ) : (
          <div className="relative inline-block">
            <Avatar
              src={`https://nekode-rqas.onrender.com/static/avatars/${data.avatarUrl}`}
              {...stringAvatar(data.username)}
            />
            <span className="absolute top-2 right-0 inline-flex items-center justify-center w-7 h-7 p-2 transform translate-x-1/2 -translate-y-1/2 bg-white border shadow-md rounded-t-full rounded-r-full">
              💻
            </span>
          </div>
        )}
        <h2>{data.username}</h2>
      </div>
      <div className="w-full flex items-center justify-end">
        <h2>{`${data.totalPoints} EXP`}</h2>
      </div>
    </div>
  );
};

export const SkeletonCard = ({ count }) => {
  const skeleton = [];
  for (let i = 0; i < count; i++) {
    skeleton.push(
      <div
        key={i}
        className="max-w-2xl w-full flex items-center justify-between gap-5 bg-jet-500 p-5 rounded-xl shadow-md shadow-picton-blue-800 text-indigo-500"
      >
        <div className="w-full flex items-center gap-5">
          <Skeleton variant="circular" width={65} height={65} />
          <Skeleton variant="text" width={150} height={24} />
        </div>
        <div className="w-full flex items-center justify-end">
          <Skeleton variant="text" width={100} height={24} />
        </div>
      </div>
    );
  }
  return <>{skeleton}</>;
};

export const LabelRanking = ({ children }) => {
  return (
    <h2 className="text-white flex items-center justify-center gap-2">
      <ArrowDownwardIcon />
      {children}
      <ArrowUpwardIcon />
    </h2>
  );
};
