import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  loading: true,
  showAuth: false
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
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setShowAuth: (state, action) => {
      state.showAuth = action.payload
    }
  },
})

export const {setShowAuth, setLoading, setIsAuthenticated, setUserInfo } = authSlice.actions
export default authSlice.reducer
