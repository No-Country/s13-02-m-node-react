import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Logo from '../logo/Logo';


function NavBar() {
      
  return (
    <AppBar position="static" className='flex'>
      <Container maxWidth="xl" className="bg-[#10151D] h-20 ">
        <Toolbar disableGutters className='flex content-center place-content-arround'>
          
          {/* Logo - Agregar el logo original */}
        <Logo />

             {/* AVATAR - agregar link a perfil*/}
          <IconButton  sx={{ p: 0 }} className='absolute inset-y-0 right-0 my-5'>
              <Avatar alt="Remy Sharp" src="/broken-image.jpg"  className="h-12 w-12"/>
          </IconButton>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
