import React, { useState, useEffect } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import axios from 'axios' // Asegúrate de importar axios

const NotificationProfile = ({ notification, userData, setUserData }) => {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  useEffect(() => {
    setUserId(localStorage.getItem('idUser'))
    setToken(localStorage.getItem('idKey'))
  }, [])

  const handleChange = async (event) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          notification: event.target.checked
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUserData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      console.log('Notificación actualizada')
    }
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          sx={{ color: 'white' }}
          control={<Switch checked={notification} onChange={handleChange} />}
          label='Recibir notificaciones'
        />
      </FormGroup>
    </>
  )
}

export default NotificationProfile
