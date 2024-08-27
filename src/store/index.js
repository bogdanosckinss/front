import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import loadingReducer from "../features/loading/loadingSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
