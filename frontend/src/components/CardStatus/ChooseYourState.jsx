"use client";
import { Avatar, Badge, Button, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GridStatues from "./GridStatues";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px #10151d`,
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

const ChooseYourState = () => {
  const statusData = [
    "💻",
    "🤘🏼",
    "🥳",
    "🤖",
    "👾",
    "😢",
    "🤩",
    "🤓",
    "😎",
    "🖐🏼",
    "🚀",
    "🙂",
  ];

  return (
    <div className="w-full">
      <div className="md:w-80 bg-jet-500 p-5 space-y-5 rounded-xl shadow-md shadow-picton-blue-800">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-white font-medium text-sm md:text-lg">
            Elige tu estado
          </h2>
          <IconButton aria-label="close" color="primary" size="small">
            <CloseIcon className="text-white md:hidden" />
          </IconButton>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="relative inline-block">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src="" sx={{ width: 65, height: 65 }} />
            </StyledBadge>
            <span className="absolute top-2 -right-2 inline-flex items-center justify-center w-9 h-9 transform translate-x-1/2 -translate-y-1/2 bg-jet-500 border border-rich-black-500 rounded-t-full rounded-r-full">
              💻
            </span>
          </div>
        </div>
        <GridStatues data={statusData} />
        <div className="w-full flex items-center justify-center md:hidden">
          <Button className="bg-picton-blue-500 hover:bg-picton-blue-600 text-white">
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourState;
