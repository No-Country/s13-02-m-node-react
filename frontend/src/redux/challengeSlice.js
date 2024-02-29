import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questions: []
}

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload
    }
  }
})

export const { setQuestions } = challengeSlice.actions
export default challengeSlice.reducer
