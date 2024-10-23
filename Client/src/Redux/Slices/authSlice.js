import { createSlice } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

const initialState = {
  isAuth: false,
  isAuthenticating: false,
  user: {
    _id: null,
    followings: [],
    tags: [],
    profilePicUrl: "",
    liked: [],
    savedPost: [],
    followingHashTags: [],
    isOnline: false,
  },
  isAuthenticationFailed: false,
  isSigningIn: false,
  isSigningUp: false,
  isProfileUpdating: false,
  isChangingPicUrl: false,
  changedPicUrl: "",
  isforgetPassword: {
    email: "",
    activeStep: 0,
    isVerifying: false,
    isVerificationFailed: false,
    isVerificationFailedMessage: "",
  },
  checkUserNameMessage: "",
  followTagsModal: false,
  onlineUsers: [],
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
        autoClose:false,
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
    setCheckUserNameMessage: (state, action) => {
      state.checkUserNameMessage = action.payload;
    },
    signOffSuccess: (state) => {
      state.isAuth = false;
      state.user = {
        _id: null,
        followings: [],
        tags: [],
        profilePicUrl: "",
        liked: [],
        savedPost: [],
        followingHashTags: [],
      };
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
    profileUpdatingFailed: (state, action) => {
      state.isProfileUpdating = false;
      notifications.update({
        title: "Something went wrong",
        message: action.payload,
        color: "red",
        id: "load-data",
      });
    },
    resetChangedPicUrl: (state) => {
      state.changedPicUrl = "";
    },
    picUpdatingModal: (state, action) => {
      state.isChangingPicUrl = action.payload;
    },
    picUpdatingStarted: (state) => {
      notifications.show({
        id: "pic-uploading",
        loading: true,
        title: "Image Uploading",
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        withCloseButton: false,
      });
    },
    picUpdatingSuccess: (state, action) => {
      state.isChangingPicUrl = false;
      state.changedPicUrl = action.payload;
      notifications.update({
        id: "pic-uploading",
        title: "Uploaded Successfully",
        message: "Your Picture is uploaded",
        color: "green",
      });
    },
    picUpdatingFailed: (state, action) => {
      notifications.update({
        id: "pic-uploading",
        title: "Uploading Picture Failed",
        message: action.payload,
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
        color: "green",
        title: "Deleted",
        message: "Account Deleted Successfully",
      });
    },
    profileDeletingFailed: (state) => {
      notifications.update({
        id: "delete-account",
        color: "red",
        title: "Deleting Account",
        message: "Deleting Account Failed",
        autoClose: false,
      });
    },
    setForgetPasswordVerificationEmail: (state, action) => {
      state.isforgetPassword.email = action.payload;
    },
    forgetPasswordVerificationStarted: (state) => {
      state.isforgetPassword.isVerifying = true;
      state.isforgetPassword.isVerificationFailed = false;
    },
    forgetPasswordVerificationSuccess: (state) => {
      state.isforgetPassword.isVerifying = false;
      state.isforgetPassword.activeStep += 1;
    },
    forgetPasswordVerificationFailed: (state, action) => {
      state.isforgetPassword.isVerifying = false;
      state.isforgetPassword.isVerificationFailed = true;
      state.isforgetPassword.isVerificationFailedMessage = action.payload;
    },
    resetForgetPasswordVerification: (state) => {
      state.isforgetPassword.activeStep = 0;
      state.isforgetPassword.email = "";
    },
    addLikedToUserPost: (state, action) => {
      state.user.liked.push(action.payload);
    },
    unlikedToUserPost: (state, action) => {
      const filteredLikedList = state.user.liked.filter((data) => {
        return data._id !== action.payload;
      });
      state.user.liked = filteredLikedList;
    },
    addSavedToUserPost: (state, action) => {
      state.user.savedPost.push(action.payload);
    },
    unSavedToUserPost: (state, action) => {
      const filteredSavedPostList = state.user.savedPost.filter((data) => {
        return data._id !== action.payload;
      });
      state.user.savedPost = filteredSavedPostList;
    },
    setFollowTagsModal: (state, action) => {
      state.followTagsModal = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers.push(action.payload);
    },
    setOfflineUsers: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter((data) => {
        return data !== action.payload;
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
  picUpdatingStarted,
  picUpdatingModal,
  picUpdatingSuccess,
  picUpdatingFailed,
  profileDeletingFailed,
  profileDeletingStarted,
  profileDeletingSuccess,
  forgetPasswordVerificationStarted,
  forgetPasswordVerificationSuccess,
  forgetPasswordVerificationFailed,
  setForgetPasswordVerificationEmail,
  resetForgetPasswordVerification,
  setCheckUserNameMessage,
  addLikedToUserPost,
  addSavedToUserPost,
  unSavedToUserPost,
  unlikedToUserPost,
  setFollowTagsModal,
  resetChangedPicUrl,
  setOnlineUsers,
  setOfflineUsers,
} = authSlice.actions;
