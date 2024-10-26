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
  isEditingPost: false,
  postModelType: "",
  createPost: {
    title: "",
    content: "",
    tags: [],
    bannerPic: "",
  },
  isGettingPopularPosts: false,
  popularPosts: [],
  isGettingPopularTags: false,
  popularTags: [],
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
    addSaveToPost: (state, action) => {
      const { userId, postId } = action.payload;
      if (state.post.data._id === postId) {
        state.post.data.savedUser.push(userId);
      }
      state.allPost = state.allPost.map((post) =>
        post._id === postId
          ? { ...post, savedUser: [...post.savedUser, userId] }
          : post
      );
    },
    unSaveToPost: (state, action) => {
      const { userId, postId } = action.payload;
      if (state.post.data._id === postId) {
        state.post.data.savedUser = state.post.data.savedUser.filter(
          (id) => id !== userId
        );
      }
      state.allPost = state.allPost.map((post) =>
        post._id === postId
          ? { ...post, savedUser: post.savedUser.filter((id) => id !== userId) }
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
    editingPostStarted: (state) => {
      state.isEditingPost = true;
      notifications.show({
        title: "Editing post",
        message: "Please wait...",
        color: "green",
        loading: true,
        id: "editing_post",
      });
    },
    editingPostSuccess: (state, action) => {
      const { _id } = action.payload;
      state.isEditingPost = false;
      state.allPost = state.allPost.map((post) =>
        post._id === _id ? { ...post, ...action.payload } : post
      );

      notifications.update({
        title: "Editing post",
        message: "Your Post Successfully edited",
        color: "green",
        id: "editing_post",
      });
    },
    editingPostFailed: (state, action) => {
      notifications.update({
        title: "editing post",
        message: action.payload || "Your Post is not edit. Please try again.",
        color: "red",
        id: "editing_post",
      });
    },
    setPostModelType: (state, action) => {
      state.postModelType = action.payload;
    },
    setCreatePost: (state, action) => {
      state.createPost = action.payload;
    },
    resetCreatePost: (state) => {
      (state.createPost.title = ""),
        (state.createPost.bannerPic = ""),
        (state.createPost.content = ""),
        (state.createPost.tags = []);
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
        message: "Please wait your message is sending.",
        color: "green",
        loading: true,
        id: "report_post",
      });
    },
    reportToPostSuccess: (state) => {
      notifications.update({
        title: "Reporting Post",
        message: "Your Report to post is sent Successfully",
        color: "green",
        id: "report_post",
      });
    },
    reportToPostFailed: (state, action) => {
      notifications.update({
        title: "Reporting Post",
        message: action.payload,
        color: "red",
        id: "report_post",
      });
    },
    getPopularPostsStarted: (state) => {
      state.isGettingPopularPosts = true;
    },
    getPopularPostsSuccess: (state, action) => {
      state.isGettingPopularPosts = false;
      state.popularPosts = action.payload;
    },
    getPopularPostsFailed: (state, action) => {
      state.isGettingPopularPosts = false;
      notifications.update({
        title: "Popular Post Failed",
        message: action.payload,
        color: "red",
        id: "popular_posts",
      });
    },
    getPopularTagsStarted: (state) => {
      state.isGettingPopularTags = true;
    },
    getPopularTagsSuccess: (state, action) => {
      state.isGettingPopularTags = false;
      state.popularTags = action.payload;
    },
    getPopularTagsFailed: (state, action) => {
      state.isGettingPopularTags = false;
      notifications.update({
        title: "Popular Tags Failed",
        message: action.payload,
        color: "red",
        id: "popular_Tags",
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
  addSaveToPost,
  unSaveToPost,
  addCommentToPost,
  creatingPostFailed,
  creatingPostStarted,
  creatingPostSuccess,
  deleteUserPost,
  openCreatePostModel,
  closeCreatePostModel,
  reportToPostStarted,
  reportToPostFailed,
  reportToPostSuccess,
  resetPost,
  setPostModelType,
  editingPostFailed,
  editingPostStarted,
  editingPostSuccess,
  resetCreatePost,
  setCreatePost,
  getPopularPostsFailed,
  getPopularPostsStarted,
  getPopularPostsSuccess,
  getPopularTagsFailed,
  getPopularTagsStarted,
  getPopularTagsSuccess,
} = publicPostsSlice.actions;
