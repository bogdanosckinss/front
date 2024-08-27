import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  userInfo: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (
      state,
      action
    ) => {
      state.isAuthenticated = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { setIsAuthenticated, setUserInfo } = authSlice.actions
export default authSlice.reducer
