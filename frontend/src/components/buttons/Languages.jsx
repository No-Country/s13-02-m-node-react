"use client"
import React, { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { AddStackProgress } from '@/utils/services/progressRequest/getStacks';

const LanguageButton = styled(Button)({
  color: '#ffffff',
  borderColor: '#86198f',
  '&:hover': {
    borderColor: '#d946ef',
    backgroundColor: '#d946ef',
  },
});

const GreyLanguageButton = styled(Button)({
  color: '#ffffff',
  borderColor: '#86198f',
  '&:hover': {
    borderColor: '#d946ef',
    backgroundColor: '#d946ef',
  },
  backgroundColor: '#525252',
});

const Languages = ({ data, onLanguageSelect,progressStacks,stackProgressId, setStackProgressId}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const userId = localStorage.getItem('idUser');
  const token = localStorage.getItem('idKey');

  const [hasProgressMap, setHasProgressMap] = useState(new Map());
 

  const hasProgress = (progressStacks, languageId) => {
    return progressStacks.some((progressStack) => progressStack.stackId === languageId);
  };

  useEffect(() => {
    if (progressStacks && progressStacks.length > 0) {
      const newHasProgressMap = new Map();
      progressStacks.forEach((progressStack) => {
        newHasProgressMap.set(progressStack.stackId, true);
      });
      setHasProgressMap(newHasProgressMap);

      const progressStack = progressStacks.find((progressStack) => progressStack.stackId === "616c8a2c-1c9b-4b4d-a0ab-6bd7f962bf0d");
      if (progressStack) {
        setStackProgressId(progressStack.id);
      }
    }
  }, [progressStacks,setStackProgressId]);


  const handleButtonClick = async (languageId) => {
    onLanguageSelect(languageId);
    setSelectedLanguage(languageId);
  
    if (!hasProgress(progressStacks, languageId)) {
      try {
        const response = await AddStackProgress(languageId, userId, token);
        const stackProgressId = response.data.id;
        setHasProgressMap((prevHasProgressMap) => {
          const newHasProgressMap = new Map(prevHasProgressMap);
          newHasProgressMap.set(languageId, true);
          return newHasProgressMap;
        });

        setStackProgressId(stackProgressId);
      } catch (error) {
        console.error('Error adding stack progress:', error);
      }
    } else {
      const progressStack = progressStacks.find((progressStack) => progressStack.stackId === languageId);
      const stackProgressId = progressStack.id;
      setStackProgressId(stackProgressId);
    }
  };
  


  return (
    <Stack spacing={2} direction='row'>
      {data.map((res) => {
        const hasProgressForLanguage = hasProgressMap.get(res.id) || hasProgress(progressStacks, res.id);
        return (
          <LanguageButton
            key={res.id}
            variant='outlined'
            onClick={() => handleButtonClick(res.id)}
            style={{
              backgroundColor: hasProgressForLanguage ? '#d946ef' : (hasProgress(progressStacks, res.id) ? '' : '#525252'),
            }}
          >
            {res.name}
          </LanguageButton>
        );
      })}
    </Stack>
  );
};

export default Languages;