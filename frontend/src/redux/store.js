import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import challengeSlice from './challengeSlice'

export const store = configureStore({
  reducer: {
    challenge: challengeSlice,
    auth: authReducer
  }
})
