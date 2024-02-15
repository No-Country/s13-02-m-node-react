
import { CardHome } from '@/components/CardHome';
import Container from '@mui/material/Container';


const pageHome = () => {
  return <>
  <Container
  maxWidth="xl"
  
  sx={{
   height: '100vh',
   
    backgroundColor: '#10151D',
  }}
  >

  
    <h1>Home</h1>
    <CardHome />
    <CardHome 
    secondary={true} />
  </Container>
  </>
}

export default pageHome
