import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ShieldIcon from '@mui/icons-material/Shield'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import PersonIcon from '@mui/icons-material/Person'

import HeartCounter from '../lives-counter/HeartCounter'
import { Divider } from '@mui/material'
import Link from 'next/link'

export default function MobileMenu() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='absolute z-50 top-10 left-48 bg-[#333333] p-4'>
      <div className='mx-auto'>
        <MenuItem className='flex gap-4'>
          <FitnessCenterIcon />
          <Link href={'/'}>Practicar</Link>
        </MenuItem>
        <MenuItem className='gap-4'>
          <ShieldIcon />
          <Link href={'/ranks'}>Rango</Link>
        </MenuItem>
        <MenuItem className='gap-4'>
          <EmojiEventsOutlinedIcon />
          <Link href={'/challenges'}>Desafíos</Link>
        </MenuItem>
        <MenuItem className='gap-4'>
          <PersonIcon />
          <Link href={'/account'}>Perfil</Link>
        </MenuItem>
        <Divider />
        <MenuItem className=''>
          <HeartCounter />
        </MenuItem>
        <MenuItem className='gap-4'>
          <Link href={'/landing'}>Cerrar sesión</Link>
        </MenuItem>
      </div>
    </div>
  )
}
