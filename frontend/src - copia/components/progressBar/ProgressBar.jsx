import React from 'react'
import { Stack, LinearProgress, Typography, Box } from '@mui/material'
const ProgressBar = ({ value, data, title, styles }) => {
  return (
    <Stack spacing={1} className='mb-[8px] w-[70%]' justifyContent='center'>
      <Typography
        className='text-white'
        align='center'
        sx={{ fontSize: '24px' }}
        fontWeight={100}
      >
        {title}
      </Typography>

      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box sx={{ width: '100%', mr: 1 }} alignItems='center'>
          <LinearProgress
            color='primary'
            variant='determinate'
            value={value}
            className={`${styles}`}
          />
        </Box>
        <Typography className='text-white'>{data}</Typography>
      </Box>
    </Stack>
  )
}

export default ProgressBar
