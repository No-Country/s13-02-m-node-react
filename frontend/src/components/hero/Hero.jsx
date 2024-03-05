'use client'
import Logo from '@/components/logo/Logo'
import { Button } from '@mui/material'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Subtitle from './Subtitle'
import Pet from '../pet/Pet'

const Hero = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <section className='flex min-h-screen flex-col items-center justify-evenly md:justify-between p-5  md:px-24 md:py-16 bg-rich-black-500'>
      <div className='flex flex-col items-center justify-center space-y-4 md:space-y-10'>
        <div className='flex flex-col lg:flex-row items-center lg:items-end justify-center gap-5'>
          <Pet className='w-40 md:w-52 ' />
          <Logo
            size='w-7 h-8 p-5 sm:w-14 sm:h-16 sm:p-2 md:w-28 md:h-32 md:p-0 text-4xl md:text-8xl'
            space='space-x-2.5 md:space-x-5'
          />
        </div>
        <Subtitle />
      </div>
      <Button
        href='/login'
        variant='outlined'
        size={isDesktop ? 'large' : 'medium'}
        className='border border-picton-blue-500 hover:border-picton-blue-600 text-picton-blue-500 hover:text-picton-blue-600 md:mt-4'
        endIcon={<KeyboardArrowRightRoundedIcon />}
      >
        Comenzar Ahora
      </Button>
    </section>
  )
}

export default Hero
