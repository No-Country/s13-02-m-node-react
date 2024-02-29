'use client'

import React, { useState, useEffect } from 'react'
import { AppBar, Container, Toolbar, IconButton, Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Logo from '../logo/Logo'
import Pet from '../pet/Pet'
import MobileMenu from '../mobileMenu/MobileMenu'
import {  useSelector } from 'react-redux'

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [avatarLetter, setAvatarLetter] = useState('')
  const avt = useSelector( (state) => state.auth.avatar
  ) 
  console.log({avt})
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // console.log("menu abierto");
  }

  useEffect(() => {
    setAvatarLetter(avt)
  }, [])
  return (
    <AppBar position='static' className='flex bg-[#10151D]'>
      <Container maxWidth='xl' className='bg-[#10151D] h-20'>
        <Toolbar
          disableGutters
          className='flex content-center place-content-between mt-2'
        >
          <div className='flex w-74 h-14 sm:w-1/6 '>
            {isMobileView ? (
              <Pet className='ml-0' />
            ) : (
              <Logo size='text-2xl w-10 h-12 p-2' space='space-x-2' />
            )}
          </div>
          {/* Botón de menú móvil (reemplaza al Avatar) */}
          {isMobileView ? (
            <IconButton
              sx={{ p: 0 }}
              className='md:hidden text-white'
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : (
            <IconButton
              sx={{ p: 0 }}
              className='hidden md:flex' /* Solo visible en dispositivos de tamaño medio y grande */
            >
              <Avatar className='h-12 w-12'>{avt}</Avatar>
            </IconButton>
          )}
          {/* Contenido del menú móvil */}
          {isMobileMenuOpen && (
            <div className='absolute top-11 right-4 z-50 '>
              <MobileMenu className='absolute z-50' />
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
