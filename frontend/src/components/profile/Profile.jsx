"use client"
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import {Box, Grid, Paper, Typography, Button,Avatar,Container,TextField
} from '@mui/material'
import { errorAuthManagement } from '../../utils/services/hooksAuth'
import { useRouter } from 'next/router'
import ProgressBar from '../progressBar/ProgressBar'
import Image from "next/image";
import fire from "/public/fire.svg";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { ConnectingAirportsOutlined } from '@mui/icons-material'
import { data } from 'autoprefixer'
import UpdateProfile from './UpdateProfile'
import NotificationProfile from './NotificationProfile'
import EditNoteIcon from '@mui/icons-material/EditNote';



 




const Profile = () => {
    const [avatarLetter, setAvatarLetter] = useState('')
    const [userData, setUserData] = useState('')
    const [editar, setEditar] = useState(false)
    const [updateName, setUpdateName] = useState('')
 
  const avt = useSelector((state) => state.auth.avatar)
  let token = localStorage.getItem('idKey');

 const decodedToken = jwtDecode(token)      

 
// hacer un get a la api para obtener los datos del usuario pasando el token



// Asumiendo que ahora pasas el userId como argumento a la función.
const getUserData = async (userId) => {
    try {
      // Asegúrate de que el token está correctamente definido aquí.
    
  
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setUserData(res.data)
  
    
     
    } catch (err) {
      console.error(err);
    }
  };
 
  
  // Ejemplo de cómo llamar a getUserData con un userId específico.
  const userId = decodedToken.user.id;
  useEffect(() => {
    getUserData(userId);
    }, [decodedToken]);
   

  
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
  useEffect(() => {
    setAvatarLetter(avt)
  }, [])


 

   
    const upDateUser = async () => {
      try {
        // Asegúrate de que el token está correctamente definido aquí.
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
          username: updateName,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data)
        
      } catch (err) {
        console.error(err);
      }finally{
        setEditar(!editar)
      }
    };

    
      
  
  


    return (
       <Container
       sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

       }}
       >
       
    
        
              <Grid container spacing={2}
              sx={{
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "25px",
               
                

                

              }}
              >
                <Grid item xs={12} md={6} >
                  
                    <Grid>
                      <Typography color={"white"} variant="h3">Profile</Typography>
                    { editar? <TextField
                  
                     InputProps={{
                        
                   
                        style: { color: 'white' }, 
                      }}
                      InputLabelProps={{
                        shrink: true,
                      
                        style: { color: 'white' }, 
                      }}
                       
                       id="standard-basic"
                       variant="standard"
                        label="Cambia tu nombre de usuario"
                        defaultValue={userData.username}
                        name='updateName'
                        onChange={(e) => setUpdateName(e.target.value)}
                     /> :  <Typography color={"white"} variant="body1">User Name:   {userData.username}</Typography>}
                      <Typography color={"white"} variant="body1">Email:  {userData.email}</Typography>
                      <NotificationProfile notification={userData.notification} 
                      userData={userData}
                      setUserData={setUserData}
                      />
                     
              { editar? <><Button color="error"
                onClick={() => setEditar(!editar)}
              >Cancelar</Button>
                <Button  onClick={upDateUser}>Actualizar</Button></> :  <Button
                onClick={() => setEditar(!editar)}
                >
              edit <EditNoteIcon />
          </Button>}
             
              
               
                      </Grid>
                 
                  
                </Grid>
               
                      
                    
                    {
                        editar? 
                        <> 
                        {/*  crear subir imagen de perfil   */}
                        sunir imagen
                        

                        
                         </> :  <Avatar
                        alt="Remy Sharp"
                        src={'j'}
                        sx={{ width: 150, height: 150 }}
                      >
                        {avt}
                        </Avatar>
                 
                    }
                  
                </Grid>
            
                
                <Grid spacing={2}
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



              </Container>

      
    )
    }

export default Profile