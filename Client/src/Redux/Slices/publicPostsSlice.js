import { notifications } from "@mantine/notifications";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGettingAllPost: false,
  isGettingSinglePost: false,
  allPost: [],
  page: 1,
  totalPages: 1,
  more: true,
  post: {
    data: {
      _id: "",
      title: "",
      likes: [],
      comments: [],
      content: "",
      bannerPic: "",
      user: {
        _id: null,
        profilePicUrl: "",
        userName: "",
        FirstName: "",
        LastName: "",
      },
    },
    comments: {
      data: [],
      page: 1,
      totalpage: 1,
    },
  },
  iscreatingPost: false,
  createPostModel: false,
};

const publicPostsSlice = createSlice({
  name: "publicPosts",
  initialState,
  reducers: {
    getAllPostsStarted: (state) => {
      state.isGettingAllPost = true;
    },
    setAllPosts: (state, action) => {
      state.isGettingAllPost = false;
      const existingPostIds = new Set(state.allPost.map((post) => post._id));
      const newPosts = action.payload.posts.filter(
        (newPost) => !existingPostIds.has(newPost._id)
      );
      state.allPost = [...state.allPost, ...newPosts];
      state.page += 1;
      state.totalPages = action.payload.totalPages;
    },
    setNoMore: (state) => {
      state.more = false;
    },
    resetAllPosts: (state) => {
      state.allPost = [];
      state.page = 1;
      state.totalPages = 1;
      state.more = true;
    },
    getSinglePostStarted: (state) => {
      state.isGettingSinglePost = true;
    },
    setSinglePost: (state, action) => {
      state.isGettingSinglePost = false;
      state.post.data = action.payload;
    },
    setSinglePostComments: (state, action) => {
      state.post.comments.data = [
        ...state.post.comments.data,
        ...action.payload.comments,
      ];
      state.post.comments.page += 1;
      state.post.comments.totalpage = action.payload.totalpage;
    },
    resetPost: (state) => {
      (state.post.data = {}), (state.post.comments.data = []);
      state.post.comments.page = 1;
      state.post.comments.totalpage = 1;
    },
    addLikeToPost: (state, action) => {
      const { userId, postId } = action.payload;
      if (state.post.data._id === postId) {
        state.post.data.likes.push(userId);
      }
      state.allPost = state.allPost.map((post) =>
        post._id === postId ? { ...post, likes: [...post.likes, userId] } : post
      );
    },
    unlikeToPost: (state, action) => {
      const { userId, postId } = action.payload;
      if (state.post.data._id === postId) {
        state.post.data.likes = state.post.data.likes.filter(
          (id) => id !== userId
        );
      }
      state.allPost = state.allPost.map((post) =>
        post._id === postId
          ? { ...post, likes: post.likes.filter((id) => id !== userId) }
          : post
      );
    },
    addCommentToPost: (state, action) => {
      const { commentdesc, postId } = action.payload;

      if (state.post.data._id === postId) {
        state.post.comments.data.push({
          _id: Math.ceil(Math.random() * 1000),
          ...commentdesc,
          createdAt: new Date().toISOString(),
        });
      }
      state.allPost = state.allPost.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  _id: Math.round() * 10,
                  ...commentdesc,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : post
      );
    },
    creatingPostStarted: (state) => {
      state.iscreatingPost = true;
      notifications.show({
        title: "Creating post",
        message: "Please wait...",
        color: "green",
        loading: true,
        id: "creating_post",
      });
    },
    creatingPostSuccess: (state, action) => {
      state.iscreatingPost = false;
      state.allPost.unshift(action.payload);
      notifications.update({
        title: "Creating post",
        message: "Your Post Successfully created",
        color: "green",
        id: "creating_post",
      });
    },
    creatingPostFailed: (state) => {
      notifications.update({
        title: "Creating post",
        message: "Your Post is not created. Please try again.",
        color: "red",
        id: "creating_post",
      });
    },
    openCreatePostModel: (state) => {
      state.createPostModel = true;
    },
    closeCreatePostModel: (state) => {
      state.createPostModel = false;
    },
    deleteUserPost: (state, action) => {
      const filterData = state.allPost.filter(
        (post) => post._id !== action.payload
      );
      state.allPost = filterData;
    },
    reportToPostStarted: (state) => {
      notifications.show({
        title: "Reporting Post",
        message: "Your Report to post is sent Successfully",
        color: "green",
      });
    },
  },
});

export default publicPostsSlice.reducer;
export const {
  getAllPostsStarted,
  getSinglePostStarted,
  setAllPosts,
  setSinglePost,
  setNoMore,
  setSinglePostComments,
  resetAllPosts,
  addLikeToPost,
  unlikeToPost,
  addCommentToPost,
  creatingPostFailed,
  creatingPostStarted,
  creatingPostSuccess,
  deleteUserPost,
  openCreatePostModel,
  closeCreatePostModel,
  reportToPostStarted,
  resetPost,
} = publicPostsSlice.actions;
