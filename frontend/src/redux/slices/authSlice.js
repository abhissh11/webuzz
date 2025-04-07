import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromStorage || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
