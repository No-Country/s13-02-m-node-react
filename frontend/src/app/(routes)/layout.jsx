import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import { Container } from '@mui/material'

const layout = ({ children }) => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        minHeight: '100vh'
      }}
      className='flex flex-col justify-between'
    >
      <NavBar />
      {children}
      <Footer />
    </Container>
  )
}
export default layout
