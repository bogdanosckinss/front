import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: true,
}

export const loadingSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoadingState: (
      state,
      action
    ) => {
      state.loading = action.payload
    },
  },
})

export const { setLoadingState } = loadingSlice.actions
export default loadingSlice.reducer
