import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  userId: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.error = null
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearAuthData(state) {
      state.token = null
      state.userId = null
      state.error = null
    },
  },
})

export const { setAuthData, setError, clearAuthData } = authSlice.actions
export default authSlice.reducer
