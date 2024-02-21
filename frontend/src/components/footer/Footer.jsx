import React from 'react'
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded'
import Pet from '../pet/Pet'
import Logo from '../logo/Logo'

const Footer = () => {
  return (
    <footer className='w-full bg-rich-black-500 text-white sm:px-10 py-10 md:px-20 md:py-5 flex items-center justify-evenly sm:justify-between gap-1 sm:gap-5'>
      <div className='lg:w-full flex flex-col md:flex-row items-center lg:gap-5'>
        <Pet className='w-6 sm:w-14' />
        <div className='hidden lg:block'>
          <Logo size='text-2xl w-8 h-9 p-2' space='space-x-2' />
        </div>
      </div>
      <section className='flex flex-col sm:flex-row gap-3 items-center'>
        <article className='w-full flex items-center justify-center font-light text-[9px] sm:text-xs md:text-sm'>
          <CopyrightRoundedIcon className='text-xs sm:text-sm md:text-lg mr-1' />
          <p className='whitespace-nowrap'>Todos los derechos reservados</p>
        </article>
        <span className='lg:hidden text-xs sm:text-base'>/</span>
        <article className='w-full text-center md:text-end font-light text-[9px] sm:text-xs md:text-sm'>
          <p className='whitespace-nowrap'>No country-s12-02-m-node-react</p>
        </article>
      </section>
    </footer>
  )
}

export default Footer
