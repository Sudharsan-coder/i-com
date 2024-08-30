import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGettingSearchPost: false,
  isGettingSearchUser: false,
  searchPosts: [],
  searchUsers: [],
  searchPostPage: 1,
  searchPostTotalPages: 1,
  searchUserPage: 1,
  searchUserTotalPages: 1,
  search: "",
  usermore: true,
  postmore: true,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchPostStarted: (state) => {
      state.isGettingSearchPost = true;
    },
    getSearchUserStarted: (state) => {
      state.isGettingSearchUser = true;
    },
    setSearchPost: (state, action) => {
      state.isGettingSearchPost = false;
      state.searchPosts = [...state.searchPosts, ...action.payload.posts];
      state.searchPostPage += 1;
      state.searchPostTotalPages = action.payload.totalPages;
    },
    setSearchUser: (state, action) => {
      state.isGettingSearchUser = false;
      state.searchUsers = [...state.searchUsers, ...action.payload.users];
      state.searchUserPage += 1;
      state.searchUserTotalPages = action.payload.totalPages;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setNoMoreUser: (state) => {
      state.usermore = false;
    },
    setNoMorePost: (state) => {
      state.postmore = false;
    },
    resetSearch: (state) => {
      state.searchUsers = [];
      state.searchPosts = [];
    },
    addLikeToSearchListPost: (state, action) => {
      const { userId, postId } = action.payload;
      state.searchPosts = state.searchPosts.map((post) =>
        post._id === postId ? { ...post, likes: [...post.likes, userId] } : post
      );
    },
    unLikeToSearchListPost: (state, action) => {
      const { userId, postId } = action.payload;
      state.searchPosts = state.searchPosts.map((post) =>
        post._id === postId
          ? { ...post, likes: post.likes.filter((id) => id !== userId) }
          : post
      );
    },
  },
});

export default searchSlice.reducer;
export const {
  getSearchPostStarted,
  getSearchUserStarted,
  setSearchPost,
  setSearchUser,
  setSearch,
  setNoMorePost,
  setNoMoreUser,
  resetSearch,
  addLikeToSearchListPost,
  unLikeToSearchListPost,
} = searchSlice.actions;
