
"use client"
import React from 'react'
import  Grid  from  "@mui/material/Grid"
import  Button  from  "@mui/material/Button"


export const CardHome = () => {
  return (
    <>
    <Grid
    sx={{
        //card whit glassmorphism
        height: '180px',
        width: '300px',
        backgroundColor: '#333333',
        borderRadius: '10px',
        margin: '10px',
        
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        borderRadius: '10px',
        
        



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
    </>
  )
}
