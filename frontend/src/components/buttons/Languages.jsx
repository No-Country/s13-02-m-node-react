"use client";
import React from "react";
import { Button, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";


const LanguageButton = styled(Button)({
  color: "#ffffff",
  borderColor: "#86198f",
  "&:hover": {
    borderColor: "#d946ef",
    backgroundColor: "#d946ef",
  },
});



const Languages = () => {
  const isXsOrMd = useMediaQuery("(max-width:960px)");
  return (
    <div>
      <Stack spacing={1} direction="row"  justifyContent="center" className="my-6 mx-2 px-2" 
      
      >
        <LanguageButton sx={{ fontSize: isXsOrMd? "10px": "x16px", textTransform: "none"}} variant="outlined">Css</LanguageButton>
        <LanguageButton sx={{ fontSize: isXsOrMd? "10px": "x16px", textTransform: "none"}} variant="outlined">JavaScript</LanguageButton>
        <LanguageButton sx={{ fontSize: isXsOrMd? "10px": "x16px", textTransform: "none"}} variant="outlined">Html</LanguageButton>
        <LanguageButton sx={{ fontSize: isXsOrMd? "10px": "x16px", textTransform: "none"}} variant="outlined">React</LanguageButton>
        <LanguageButton sx={{ fontSize: isXsOrMd? "10px": "x16px", textTransform: "none"}} variant="outlined">Node</LanguageButton>
      </Stack>
    </div>
  );
};

export default Languages;
