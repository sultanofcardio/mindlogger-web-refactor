import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { UserStore } from "../user.schema"

import { RootState } from "~/shared/utils"

export const initialState: UserStore = {
  email: undefined,
  fullName: undefined,
  id: undefined,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStore>) => {
      return { ...state, ...action.payload }
    },
    clearUser: () => {
      return initialState
    },
  },
})

export const userSelector = (state: RootState) => state.user

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
