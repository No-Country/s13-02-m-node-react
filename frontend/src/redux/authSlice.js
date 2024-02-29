import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  avatar: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.token
      state.avatar = action.payload.avatar
      state.error = null
    },
    setError(state, action) {
      state.error = action.payload
    },
    clearAuthData(state) {
      state.token = null
      state.avatar = null
      state.error = null
    },
    setAvatar(state, action) {
        state.avatar = action.payload
    }
  },
})

export const { setAuthData, setError, clearAuthData, setAvatar } = authSlice.actions
export default authSlice.reducer
