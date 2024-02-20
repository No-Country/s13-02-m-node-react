
import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'


const CardDefLenguajeHome = () => {

  const isXsOrMd = useMediaQuery("(max-width:768px)");

  return (
    <Card

      sx={{
        maxWidth: 500,
        height: 146,
        backgroundColor: '#333333',
        color: 'white',
        borderRadius: ['19px'],
        boxShadow: '0px 0px 8px 0px rgba( 31, 38, 135, 1 )'
      }}
    >
      <CardContent>
        <Typography variant='h5' component='h2' className='mb-1'>
          JavaScript
        </Typography>
        <Typography variant='body2' color='#FFFFFF'>
          JavaScript is a programming language used in web development to add
          interactivity to web pages. Its simple syntax and extensive ecosystem
          of tools make it essential in creating dynamic user experiences.
        </Typography>
      </CardContent>
    </Card>

  )
}

export default CardDefLenguajeHome

