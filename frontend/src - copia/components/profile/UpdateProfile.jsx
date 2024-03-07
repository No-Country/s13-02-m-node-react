import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box' // Add this import statement
import React from 'react'

const UpdateProfile = ({ updateName, setUpdateName, handleSubmit }) => {
  const handleChange = (event) => {
    setUpdateName(event.target.value)
  }

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          id='outlined-helperText'
          label='Name'
          defaultValue={updateName}
          name='updateName'
          onChange={handleChange}
        />
        <button>Actualizar</button>
      </Box>
    </>
  )
}

export default UpdateProfile
