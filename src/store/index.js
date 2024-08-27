import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import loadingReducer from "../features/loading/loadingSlice"
import postsReducer from "../features/posts/postsSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  posts: postsReducer
})

export const store = configureStore({
  reducer: rootReducer,
})
