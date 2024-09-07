import { createSlice } from "@reduxjs/toolkit";

// Check if localStorage is available
const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
  return null;
};

const user = getUserFromLocalStorage();

const initialState = {
  currentUser: user ? user : null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("user");
      }
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("user");
      }
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;