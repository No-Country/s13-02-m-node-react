import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import challengeSlice from './challengeSlice'
import tokenSlice from './tokenSlice'

export const store = configureStore({
  reducer: {
    challenge: challengeSlice,
    auth: authReducer,
    token: tokenSlice
  }
})


