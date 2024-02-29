"use client"
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import {Box, Grid, Paper, Typography, Button
} from '@mui/material'
import { errorAuthManagement } from '../../utils/services/hooksAuth'
import { useRouter } from 'next/router'








const Profile = () => {

    

    return (
       <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                  
                    <Grid>
                      <Typography variant="h6">Profile</Typography>
                      <Typography variant="body1">Username: {localStorage.getItem('username')}</Typography>
                      <Typography variant="body1">Email: {localStorage.getItem('email')}</Typography>
                      </Grid>
                 
                  
                </Grid>
                <Grid item xs={12} md={6}
                >
                      
                    
                      <span>img</span>
                     </Grid>
                </Grid>
              

       </Box>
    )
    }

export default Profile