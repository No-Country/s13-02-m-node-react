import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import { Container } from '@mui/material'
import React from 'react'

const pageChallenges = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        minHeight: '100vh'
      }}
      className='flex flex-col justify-between'
    >
      <NavBar />
      <main className='h-full'></main>
      <Footer />
    </Container>
  )
}

export default pageChallenges
