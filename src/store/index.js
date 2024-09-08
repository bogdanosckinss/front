import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice.js"
import loadingReducer from "../features/loading/loadingSlice.js"
import postsReducer from "../features/posts/postsSlice.js"

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  posts: postsReducer
})

export const store = configureStore({
  reducer: rootReducer,
})
