import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import Image from "next/image";
import fire from "/public/fire.svg";
import ProgressBar from '../progressBar/ProgressBar'



const dataCardPrimary = [{
    firts: '0',
    data: 'Dias de racha',
},
{
    firts: 'ORO',
    data: 'Rango actual',
},
{
    firts: '2',
    data: 'Veces en el top 10',
},
{
    firts: 'EXP',
    data: 'Experiencia totales',
}]
const dataSecondary = [
{
    title: 'En llamas',
    data: '30/75',
},
{
    title: 'Filosofo',
    data: '750/1500',
},
{
    title: 'Leyenda',
    data: '0/100',
},
{
    title: 'Inteligente',
    data: '2/10',
}
]


export const Cards = () => {
  return (
    <>    <Grid spacing={2}
    container
   
    >


{
dataCardPrimary.map((item, index) => {
return (
<Grid item xs={12} md={6} key={index}>
    <Paper
        sx={{
          
            backgroundColor: "#333333",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderRadius: "10px",
            display: 'flex',
            flexDirection: 'column',
            padding: "10px",
            paddingLeft: "20px",
          
        }}
    >
        <Typography sx={{display : "flex",gap: "10px"
        }} color={"white"} variant="h6"> <Image src={fire} alt="oro" width={20} height={20} /> {item.firts}</Typography>
        <Typography color={"white"} variant="body1">{item.data}</Typography>
    </Paper>
</Grid>
)
})
}




</Grid>
<Grid container 
>
<Typography marginBottom={"20px"} color={"white"} variant="h6">Logros</Typography>
<Grid item xs={12}  >
{
dataSecondary.map((item, index) => {
  return (
    <Paper
         key={index}
         sx={{
              backgroundColor: "#333333",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              borderRadius: "10px",
              display: 'flex',
              flexDirection: 'column',
              padding: "10px",
              paddingLeft: "20px",
              marginBottom: "20px"
         }}
    >
         <Typography color={"white"} variant="h6">{item.title}</Typography>
         <ProgressBar value={item.data.split('/')[0] * 100 / item.data.split('/')[1]} 
         
            data={item.data}
         />
         <Typography color={"white"} variant="body1">{item.data}</Typography>
    </Paper>
  )
})
}
</Grid>
</Grid>

</>
  )
}
