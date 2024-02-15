"use client";
import React from "react";
import { Button, styled } from "@mui/material";
import Stack from "@mui/material/Stack";

const LanguageButton = styled(Button)({
  color: "#ffffff",
  borderColor: "#86198f",
  "&:hover": {
    borderColor: "#d946ef",
    backgroundColor: "#d946ef",
  },
});

const Languages = () => {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <LanguageButton variant="outlined">Css</LanguageButton>
        <LanguageButton variant="outlined">JavaScript</LanguageButton>
        <LanguageButton variant="outlined">Html</LanguageButton>
        <LanguageButton variant="outlined">React</LanguageButton>
        <LanguageButton variant="outlined">Node</LanguageButton>
      </Stack>
    </div>
  );
};

export default Languages;
