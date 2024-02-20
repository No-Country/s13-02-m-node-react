
"use client"
import React from 'react'
import  Grid  from  "@mui/material/Grid"
import  Button  from  "@mui/material/Button"
import oro from '/public/oro.svg'
import Image from "next/image";
import Typography from '@mui/material/Typography';


export const CardHome = ({secondary}) => {
  return (
    <>
    {
        secondary ?  <Grid
        sx={{
            //card whit glassmorphism
            //  height: '350px',
            // width: '300px',
            backgroundColor: '#333333',
            borderRadius: '10px',
            margin: '10px',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
            borderRadius: '10px',
            position: 'sticky',
            top: '350px',
            
    
    
    
        }}
        >
            <Grid item
            spacing={2}
            sx={{
                display: 'flex',
                padding: '10px',
                color: 'white',
                justifyContent: 'space-between',
                alignItems: 'space-between',
    
            }}
            >
                 <Typography  component="h2">
                 Desafio del dia
              </Typography>
               
               
                </Grid>
            <Grid item
            
            gap={2}
            sx={{
                display: 'flex',
    
                padding: '10px',
                marginLeft: '10px',
                color: 'white',
               
    
               
               
    
            }}
            >
            {/** importar imagen de public */}
    
           <Image src={oro} alt="oro" width={50} height={50} />
           <Grid item 
                sx={{
                   
                    padding: '10px',
                    color: 'white',
                    justifyContent: 'center',
                  
                    margin: '10px',
                    
                }}
                >
                <Typography  component="h2">
                Gana 10 xp
              </Typography>
                <Typography  component="h2">
                --barra--
              </Typography>
                  
                </Grid>
               
                </Grid>
              
    
    
    
        </Grid> :<Grid
        sx={{
            //card whit glassmorphism
            // height: '180px',
            // width: '300px',
            backgroundColor: '#333333',
            borderRadius: '10px',
            margin: '10px',
            marginTop: '0px',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            border: '1px solid rgba( 255, 255, 255, 0.18 )',
            borderRadius: '10px',
            position: 'sticky',
            top: "100px",
         
            
    
    
    
        }}
        >
            <Grid item
            spacing={2}
            sx={{
                display: 'flex',
                padding: '10px',
                color: 'white',
                justifyContent: 'space-between',
                alignItems: 'space-between',
    
            }}
            >
                <h1>divison oro</h1>
                <h1>Ver ligas</h1>
                </Grid>
            <Grid item
            spacing={2}
            gap={2}
            sx={{
                display: 'flex',
                padding: '10px',
                marginLeft: '10px',
                color: 'white',
               
               
    
            }}
            >
            {/** importar imagen de public */}
    
           <Image src={oro} alt="oro" width={50} height={50} />
    
                <h1>Estás a 3 puestos de la zona de descenso.</h1>
                </Grid>
                <Grid item 
                sx={{
                    display: 'flex',
                    padding: '10px',
                    color: 'white',
                    justifyContent: 'center',
                  
                    margin: '10px',
                    
                }}
                >
                    <Button
                    variant='contained'
                    sx={{
                       
                        color: '#A87FFB',
                        borderRadius: '10px',
                        padding: '5px',
                        margin: '5px',
                      
                        fontSize: '10px',
                        
                    
                    }}
                    >Jugar a las ligas</Button>
                </Grid>
    
    
    
        </Grid>
    }
    
   
    </>
  )
}
