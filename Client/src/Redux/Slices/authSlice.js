import { createSlice } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

const initialState = {
  isAuth: false,
  isAuthenticating: false,
  user: {
    _id: null,
    followings: [],
    tags: [],
  },
  isAuthenticationFailed: false,
  isSigningIn: false,
  isSigningUp: false,
  isProfileUpdating: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticationStarted: (state) => {
      state.isAuthenticating = true;
      notifications.show({
        title: "Signing In ",
        message: "Please wait...",
        color: "green",
        loading: true,
        id: "auth",
      });
    },
    authenticationSucess: (state, action) => {
      state.isAuthenticating = false;
      state.isAuth = true;
      state.user = action.payload;
      state.isAuthenticationFailed = false;
      notifications.update({
        title: "Sign In Successfully",
        message: "You have been signed in successfully. Welcome back!",
        color: "green",
        loading: false,
        id: "auth",
      });
    },
    authenticationFailed: (state, action) => {
      state.isAuthenticating = false;
      state.isAuthenticationFailed = true;
      state.isAuth = false;
      notifications.update({
        title: "Authentication Failed",
        message: action.payload,
        color: "red",
        id: "auth",
      });
    },
    signInStarted: (state) => {
      state.isSigningIn = true;
    },
    signInSuccess: (state, action) => {
      state.isAuth = true;
      state.isSigningIn = false;
      state.user = action.payload;
    },
    signInFailed: (state, action) => {
      state.isSigningIn = false;
      notifications.show({
        title: "Sign In Failed",
        message: action.payload,
        color: "red",
      });
    },
    signUpStarted: (state) => {
      state.isSigningUp = true;
    },
    signUpSuccess: (state, action) => {
      state.isSigningUp = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    signUpFailed: (state, action) => {
      state.isSigningUp = false;
      notifications.show({
        title: "Sign Up Failed",
        message: action.payload,
        color: "red",
      });
    },
    signOffSuccess: (state) => {
      state.isAuth = false;
      state.user = { _id: null };
      notifications.show({
        title: "Sign Off Successfully",
        message: "You have been logged out successfully.",
        color: "green",
      });
    },
    followingStarted: (state, action) => {
      state.user.followings.push(action.payload);
    },
    followingSuccess: (state, action) => {
      notifications.show({
        title: "Following Successfully",
        message: action.payload,
        color: "green",
      });
    },
    profileUpdatingStarted: (state) => {
      state.isProfileUpdating = true;
      notifications.show({
        id: "load-data",
        loading: true,
        title: "Loading your data",
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        withCloseButton: false,
      });
    },
    profileUpdatingSuccess: (state, action) => {
      state.isProfileUpdating = false;
      state.user = action.payload;
      notifications.update({
        id: "load-data",
        title: "Updated Successfully",
        message: "Your profile is updated",
        color: "green",
      });
    },
    profileUpdatingFailed: (state) => {
      state.isProfileUpdating = false;
      notifications.update({
        title: "Something went wrong",
        message: "Your profile is not updated",
        color: "red",
        id: "load-data",
      });
    },
    profileDeletingStarted: (state) => {
      notifications.show({
        id: "delete-account",
        loading: true,
        title: "Deleting the Account",
        message:
          "Account will be Deleted in 3 seconds, you cannot close this yet",
        autoClose: false,
        withCloseButton: false,
      });
    },
    profileDeletingSuccess: (state) => {
      state.isAuth = false;
      state.user = {
        _id: null,
        followings: [],
        tags: [],
      };
      notifications.update({
        id: "delete-account",
        loading: true,
        title: "Deleted",
        message: "Account Deleted Successfully",
        autoClose: false,
        withCloseButton: false,
      });
    },
    profileDeletingFailed: (state) => {
      notifications.update({
        id: "delete-account",
        loading: true,
        title: "Deleting Account",
        message: "Deleting Account Failed",
        autoClose: false,
      });
    },
  },
});

export default authSlice.reducer;
export const {
  authenticationFailed,
  authenticationStarted,
  authenticationSucess,
  signInStarted,
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpStarted,
  signUpSuccess,
  signOffSuccess,
  followingStarted,
  followingSuccess,
  profileUpdatingFailed,
  profileUpdatingStarted,
  profileUpdatingSuccess,
  profileDeletingFailed,
  profileDeletingStarted,
  profileDeletingSuccess,
} = authSlice.actions;
