import React from 'react';
import { Stack, LinearProgress, Typography, Box } from '@mui/material';

const ProgressBar = () => {
  return (
    <Stack spacing={1} className="mb-4 w-[70%]"  justifyContent="center">
      <Typography className='text-white'  align="center" sx={{fontSize:"24px"}} fontWeight={100} >
        Tu progreso de hoy
      </Typography>

      <Box display="flex" alignItems="center"  justifyContent="center">
        <Box sx={{ width: '100%', mr: 1 }} alignItems="center">
          <LinearProgress color="primary" variant="determinate" value={50} />
        </Box>
        <Typography className='text-white'>%50</Typography>
      </Box>
    </Stack>
  );
};

export default ProgressBar;