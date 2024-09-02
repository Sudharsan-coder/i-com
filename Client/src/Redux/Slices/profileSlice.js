import { notifications } from "@mantine/notifications";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGettingProfile: false,
  isGettingMyPosts: false,
  myposts: {
    page: 1,
    totalPages: 1,
    data: [],
    more: true
  },
  profile: {
    id: null,
    userBio:"",
    followers:[],
    followings:[],
    likes:[],
    commented:[],
    location:"",
    DOB:"",
    posts:[]
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfileStarted: (state) => {
      state.isGettingProfile = true;
    },
    getMyPostsStarted: (state) => {
      state.isGettingMyPosts = true;
    },
    setProfile: (state, action) => {
      state.isGettingProfile = false;
      state.profile = action.payload;
    },
    setMyPosts: (state, action) => {
      state.isGettingMyPosts = false;
      state.myposts.data = [...state.myposts.data,...action.payload.posts];
      state.myposts.page += 1;
      state.myposts.totalPages = action.payload.totalPages;
    },
    getProfileFailed: (state, action) => {
      state.isGettingProfile = false;
      notifications.show({
        title: "Get Profile Failed",
        message: action.payload,
      });
    },
    getMyPostsFailed: (state, action) => {
      state.isGettingMyPosts = false;
      notifications.show({
        title: "Get ProfilePosts Failed",
        message: action.payload,
      });
    },
    setNoMoreMyPost:(state)=>{
        state.myposts.more = false;
    },
    followersStarted:(state,action)=>{
        state.profile.followers.push(action.payload);
    },
    newPostAdded:(state,action)=>{
      state.myposts.data.unshift(action.payload)
    }
  },
});

export default profileSlice.reducer;
export const {
  setMyPosts,
  getMyPostsFailed,
  getMyPostsStarted,
  getProfileFailed,
  getProfileStarted,
  setProfile,
  setNoMoreMyPost,
  followersStarted,
  newPostAdded,
} = profileSlice.actions;
