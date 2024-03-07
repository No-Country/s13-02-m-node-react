'use client'
import React from 'react'

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
import InputFileUpload from './InputFileUpload'
import { Cards } from './Cards'
import { useGetUserData } from '../../utils/services/hookProfileUser'

const Profile = () => {
  const [editar, setEditar] = useState(false)
  const [updateName, setUpdateName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const data = useGetUserData()

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const upDateUser = async () => {
    let token = localStorage.getItem('idKey')
    let userId = localStorage.getItem('idUser')

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

      data.setUserData(res.data)
      setSelectedFile(null)
      setEditar(false)
    } catch (err) {
      console.error(err)
    } finally {
      window.location.reload()
    }
  }
  console.log(data.userData)

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
                defaultValue={data.userData.username}
                name='updateName'
                onChange={(e) => setUpdateName(e.target.value)}
              />
            ) : (
              <Typography color={'white'} variant='body1'>
                User Name: {data.userData.username}
              </Typography>
            )}
            <Typography color={'white'} variant='body1'>
              Email: {data.userData.email}
            </Typography>
            <NotificationProfile
              notification={data.userData.notification}
              setUserData={data.setUserData}
            />
            {editar ? (
              <>
                <Button color='error' onClick={() => setEditar(!editar)}>
                  Cancelar
                </Button>
                <Button color='success' onClick={upDateUser}>
                  Guardar
                </Button>
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
            src={`https://nekode-rqas.onrender.com/static/avatars/${data.userData.avatarUrl}`}
            sx={{ width: 150, height: 150 }}
          ></Avatar>
        )}
      </Grid>
      //Joaquin1!
      <Cards />
    </Container>
  )
}

export default Profile
