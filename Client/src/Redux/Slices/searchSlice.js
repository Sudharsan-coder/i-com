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
    setNoMoreUser: (state) => {
      state.usermore = false;
    },
    setNoMorePost: (state) => {
      state.postmore = false;
    },
    resetSearch: (state) => {
      state.searchUsers = [];
      state.searchPosts = [];
      state.searchPostPage = 1;
      state.searchPostTotalPages =1;
      state.searchUserPage = 1;
      state.searchUserTotalPages = 1;
      state.usermore = true;
      state.postmore = true;
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
    addSaveToSearchListPost:(state,action)=>{
      const { userId, postId } = action.payload;
      state.searchPosts = state.searchPosts.map((post) =>
        post._id === postId ? { ...post, savedUser: [...post.savedUser, userId] } : post
      );
    },
    unSaveToSearchListPost:(state,action)=>{
      const { userId, postId } = action.payload;
      state.searchPosts = state.searchPosts.map((post) =>
        post._id === postId
          ? { ...post, savedUser: post.savedUser.filter((id) => id !== userId) }
          : post
      );
    },
    editingSearchPostSuccess:(state,action) =>{
      const {_id} = action.payload;
      state.searchPosts = state.searchPosts.map((post) =>
        post._id === _id ? { ...post,...action.payload } : post
      );
    }
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
  addSaveToSearchListPost,
  unSaveToSearchListPost,
  editingSearchPostSuccess,
} = searchSlice.actions;
