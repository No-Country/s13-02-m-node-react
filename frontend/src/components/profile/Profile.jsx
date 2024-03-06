'use client'
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Container,
  TextField
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import NotificationProfile from './NotificationProfile'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { Cards } from './Cards'
import InputFileUpload from './InputFileUpload'

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState('')
  const [userData, setUserData] = useState('')
  const [editar, setEditar] = useState(false)
  const [updateName, setUpdateName] = useState('')

  const avt = useSelector((state) => state.auth.avatar)
  useEffect(() => {
    let userId = localStorage.getItem('idUser')
    let token = localStorage.getItem('idKey')
    getUserData(token, userId)
  }, [])

  const getUserData = async (token, userId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUserData(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  console.log(userData)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const upDateUser = async (userId) => {
    try {
      const formData = new FormData()
      if (selectedFile) {
        formData.append('avatar', selectedFile)
      }
      if (updateName) {
        formData.append('username', updateName)
      }

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUserData(res.data)
      setSelectedFile(null) // Limpiar el archivo seleccionado después de la carga
      setEditar(false) // Opcional: cerrar el modo de edición
    } catch (err) {
      console.error(err)
    } finally {
      getUserData(userId) // Actualizar los datos del usuario después de la carga
    }
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '25px'
        }}
      >
        <Grid item xs={12} md={6}>
          <Grid>
            <Typography color={'white'} variant='h3'>
              Profile
            </Typography>
            {editar ? (
              <TextField
                InputProps={{
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  shrink: true,

                  style: { color: 'white' }
                }}
                id='standard-basic'
                variant='standard'
                label='Cambia tu nombre de usuario'
                defaultValue={userData.username}
                name='updateName'
                onChange={(e) => setUpdateName(e.target.value)}
              />
            ) : (
              <Typography color={'white'} variant='body1'>
                User Name: {userData.username}
              </Typography>
            )}
            <Typography color={'white'} variant='body1'>
              Email: {userData.email}
            </Typography>
            <NotificationProfile
              notification={userData.notification}
              userData={userData}
              setUserData={setUserData}
            />

            {editar ? (
              <>
                <Button color='error' onClick={() => setEditar(!editar)}>
                  Cancelar
                </Button>
                <Button onClick={upDateUser(userId)}>Actualizar</Button>
              </>
            ) : (
              <Button onClick={() => setEditar(!editar)}>
                edit <EditNoteIcon />
              </Button>
            )}
          </Grid>
        </Grid>

        {editar ? (
          <InputFileUpload onFileSelect={handleFileSelect} />
        ) : (
          <Avatar
            alt='Remy Sharp'
            src={`https://nekode-rqas.onrender.com/static/avatars/${userData.avatarUrl}`}
            sx={{ width: 150, height: 150 }}
          ></Avatar>
        )}
      </Grid>

      <Cards />
    </Container>
  )
}

export default Profile
