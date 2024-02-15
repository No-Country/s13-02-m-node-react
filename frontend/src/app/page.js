import { CardHome } from '@/components/CardHome'
import { Container } from '@mui/material'

export default function Home() {
  return (
    <>
      <Container
        maxWidth='xl'
        sx={{
          height: '100vh',

          backgroundColor: '#10151D'
        }}
      >
        <h1 className='text-white'>Home</h1>
        <CardHome />
        <CardHome secondary={true} />
      </Container>
    </>
  )
}
