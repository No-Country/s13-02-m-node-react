'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Button, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
const LanguageButton = styled(Button)({
  color: '#ffffff',
  borderColor: '#86198f',
  '&:hover': {
    borderColor: '#d946ef',
    backgroundColor: '#d946ef'
  }
})

const Languages = ({ data, onLanguageSelect}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleButtonClick = (languageId) => {
    onLanguageSelect(languageId);
    setSelectedLanguage(languageId);
  };
  useEffect(() => {
    if (!data || data.length === 0 || selectedLanguage) {
      return;
    }

    setSelectedLanguage(data[0].id);
  }, [data, selectedLanguage]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className='mb-3'>
      <Stack spacing={2} direction='row'>
        {data.map((res) => (
          <LanguageButton
            key={res.id}
            variant='outlined'
             onClick={() => handleButtonClick(res.id)}
             style={{
               backgroundColor: selectedLanguage === res.id ? '#d946ef' : ''
             }}
          >
            {res.name}
          </LanguageButton>
        ))}
      </Stack>
    </div>
  )
}

export default Languages
