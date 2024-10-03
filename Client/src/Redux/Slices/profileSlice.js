import { notifications } from "@mantine/notifications";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGettingProfile: false,
  isGettingMyPosts: false,
  myposts: {
    page: 1,
    totalPages: 1,
    data: [],
    more: true,
  },
  profile: {
    id: null,
    userBio: "",
    followers: [],
    followings: [],
    likes: [],
    commented: [],
    profilePicUrl:"",
    location: "",
    DOB: "",
    posts: [],
    userName:"",
  },
  followUsers: {
    isGettingUsers: false,
    users: [],
    page: 1,
    totalPages: 1,
    more: true,
  },
  isEditingPost:false,
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
      state.myposts.data = [...state.myposts.data, ...action.payload.posts];
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
    setNoMoreMyPost: (state) => {
      state.myposts.more = false;
    },
    resetMyPosts: (state) => {
      state.myposts.data = [];
      state.myposts.page = 1;
      state.myposts.totalPages = 1;
      state.myposts.more = true;
    },
    addLikeToProfilePost:(state,action)=>{
      const { userId, postId } = action.payload;
      state.myposts.data = state.myposts.data.map((post) =>
        post._id === postId ? { ...post, likes: [...post.likes, userId] } : post
      );
    },
    unLikeToProfilePost:(state,action)=>{
      const { userId, postId } = action.payload;
      state.myposts.data = state.myposts.data.filter((post) =>
        post._id === postId
          ? { ...post, likes: post.likes.filter((id) => id !== userId) }
          : post)
    },
    addSaveToProfilePost:(state,action)=>{
      const { userId, postId } = action.payload;
      state.myposts.data = state.myposts.data.map((post) =>
        post._id === postId ? { ...post, savedUser: [...post.savedUser, userId] } : post
      );
    },
    unSaveToProfilePost:(state,action)=>{
      const { userId, postId } = action.payload;
      state.myposts.data = state.myposts.data.filter((post) =>
        post._id === postId
          ? { ...post, savedUser: post.savedUser.filter((id) => id !== userId) }
          : post)
    },
    followersStarted: (state, action) => {
      state.profile.followers.push(action.payload);
    },
    newPostAdded: (state, action) => {
      state.myposts.data.unshift(action.payload);
    },
    getFollowUsersStarted: (state) => {
      state.followUsers.isGettingUsers = true;
    },
    getFollowUsersSuccess: (state, action) => {
      state.followUsers.isGettingUsers = false;
      const existingUserIds = new Set(
        state.followUsers.users.map((user) => user.id)
      );
      const newUsers = action.payload.followUsers.filter(
        (user) => !existingUserIds.has(user.id)
      );
      state.followUsers.users = [...state.followUsers.users, ...newUsers];
      state.followUsers.page += 1;
      state.followUsers.totalPages = action.payload.totalPages;
    },
    setNoMoreFollowUsers: (state) => {
      state.followUsers.more = false;
    },
    resetFollowUsers: (state) => {
      state.followUsers.isGettingUsers = false;
      state.followUsers.users = [];
      state.followUsers.page = 1;
      state.followUsers.totalPages = 1;
      state.followUsers.more = true;
    },
    deletePostStarted: (state) => {
      notifications.show({
        title: "Deleting Post",
        loading: true,
        autoClose: false,
        id: "delete post",
      });
    },
    deletePostSuccess: (state, action) => {
      const filterPostIds = state.profile.posts.filter(
        (postId) => postId !== action.payload
      );
      state.profile.posts = filterPostIds
      const filteredData = state.myposts.data.filter(
        (post) => post._id !== action.payload
      );
      state.myposts.data = filteredData;
      notifications.update({
        title: "Deleting Post",
        message: "Your Post Deleted Successfully",
        color: "green",
        id: "delete post",
      });
    },
    deletePostFailed: (state, action) => {
      notifications.update({
        title: "Deleting Post",
        message: action.payload,
        color: "red",
        id: "delete post",
      });
    },
    editingMyPostSuccess:(state,action) =>{
      const {_id} = action.payload;
      state.myposts.data = state.myposts.data.map((post) =>
        post._id === _id ? { ...post,...action.payload } : post
      );
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
  getFollowUsersStarted,
  getFollowUsersSuccess,
  setNoMoreFollowUsers,
  resetFollowUsers,
  resetMyPosts,
  deletePostSuccess,
  deletePostFailed,
  deletePostStarted,
  addLikeToProfilePost,
  unLikeToProfilePost,
  addSaveToProfilePost,
  unSaveToProfilePost,
  editingMyPostSuccess,
} = profileSlice.actions;
