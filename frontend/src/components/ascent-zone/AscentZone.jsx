"use client";
import { Avatar, Badge, styled } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px #333333`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid #44b700",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const AscentZone = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.puntaje - a.puntaje);
  const firstThree = sortedData.slice(0, 3);
  const nextTwo = sortedData.slice(3, 5);
  const remainingData = sortedData.slice(5);
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      {firstThree.map((item, index) => (
        <div
          key={index}
          className="max-w-2xl w-full flex items-center justify-between gap-5 bg-jet-500 p-5 rounded-xl shadow-md shadow-picton-blue-800 text-indigo-500"
        >
          <div className="w-full flex items-center gap-5">
            <div className="relative inline-block">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={item.imagen} sx={{ width: 65, height: 65 }} />
              </StyledBadge>
              <span className="absolute top-2 right-0 inline-flex items-center justify-center w-7 h-7 p-2 transform translate-x-1/2 -translate-y-1/2 bg-white border shadow-md rounded-t-full rounded-r-full">
                💻
              </span>
            </div>
            <h2>{item.nombre}</h2>
          </div>
          <div className="w-full text-end">
            <h2>{`${item.puntaje} EXP`}</h2>
          </div>
        </div>
      ))}

      <h2 className="text-white flex items-center justify-center gap-2">
        <ArrowDownwardIcon />
        ZONA DE ASCENSO
        <ArrowUpwardIcon />
      </h2>

      {nextTwo.map((item, index) => (
        <div
          key={index}
          className="max-w-2xl w-full flex items-center justify-between gap-5 bg-jet-500 p-5 rounded-xl shadow-md shadow-picton-blue-800 text-indigo-500"
        >
          <div className="w-full flex items-center gap-5">
            <div className="relative inline-block">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={item.imagen} sx={{ width: 65, height: 65 }} />
              </StyledBadge>
              <span className="absolute top-2 right-0 inline-flex items-center justify-center w-7 h-7 p-2 transform translate-x-1/2 -translate-y-1/2 bg-white border shadow-md rounded-t-full rounded-r-full">
                💻
              </span>
            </div>
            <h2>{item.nombre}</h2>
          </div>
          <div className="w-full text-end">
            <h2>{`${item.puntaje} EXP`}</h2>
          </div>
        </div>
      ))}

      <h2 className="text-white flex items-center justify-center gap-2">
        <ArrowDownwardIcon />
        ZONA DE DESCENSO
        <ArrowUpwardIcon />
      </h2>

      {remainingData.map((item, index) => (
        <div
          key={index}
          className="max-w-2xl w-full flex items-center justify-between gap-5 bg-jet-500 p-5 rounded-xl shadow-md shadow-picton-blue-800 text-indigo-500"
        >
          <div className="w-full flex items-center gap-5">
            <div className="relative inline-block">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={item.imagen} sx={{ width: 65, height: 65 }} />
              </StyledBadge>
              <span className="absolute top-2 right-0 inline-flex items-center justify-center w-7 h-7 p-2 transform translate-x-1/2 -translate-y-1/2 bg-white border shadow-md rounded-t-full rounded-r-full">
                💻
              </span>
            </div>
            <h2>{item.nombre}</h2>
          </div>
          <div className="w-full text-end">
            <h2>{`${item.puntaje} EXP`}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AscentZone;
