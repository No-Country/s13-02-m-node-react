"use client";
import React from "react";
import { useState, useEffect } from "react";
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

const Languages = ({ onClick, data }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.keys(data)[0]
  );

  const handleButtonClick = (language) => {
    setSelectedLanguage(language);
    onClick(language);
  };

  useEffect(() => {
    onClick(selectedLanguage);
  }, [selectedLanguage, onClick]);

  return (
    <div>
      <Stack spacing={2} direction="row">
        {Object.keys(data).map((language, index) => (
          <LanguageButton
            key={index}
            variant="outlined"
            onClick={() => handleButtonClick(language)}
            style={{
              backgroundColor: selectedLanguage === language ? "#d946ef" : "",
            }}
          >
            {language}
          </LanguageButton>
        ))}
      </Stack>
    </div>
  );
};

export default Languages;
