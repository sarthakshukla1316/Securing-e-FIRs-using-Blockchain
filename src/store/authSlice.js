import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    aadharNumber: "",
    hash: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (user == null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action) => {
      const { aadharNumber, hash } = action.payload;
      state.otp.aadharNumber = aadharNumber;
      state.otp.hash = hash;
    },
    removeAuth: (state, action) => {
      state.user = null;
      state.isAuth = false;
      document.cookie = `refreshToken =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      document.cookie = `accessToken =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    },
  },
});

export const { setAuth, setOtp, removeAuth } = authSlice.actions;

export default authSlice.reducer;
