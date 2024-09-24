import { put, takeLatest, call, select, take, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  addCommentToPost,
  addLikeToPost,
  closeCreatePostModel,
  creatingPostFailed,
  creatingPostStarted,
  creatingPostSuccess,
  deleteUserPost,
  editingPostFailed,
  editingPostStarted,
  editingPostSuccess,
  getAllPostsStarted,
  getSinglePostStarted,
  openCreatePostModel,
  reportToPostFailed,
  reportToPostStarted,
  reportToPostSuccess,
  resetAllPosts,
  setAllPosts,
  setNoMore,
  setSinglePost,
  setSinglePostComments,
  unlikeToPost,
} from "./Slices/publicPostsSlice";
import axios from "axios";
import {
  addLikeToSearchListPost,
  editingSearchPostSuccess,
  getSearchPostStarted,
  getSearchUserStarted,
  setNoMorePost,
  setNoMoreUser,
  setSearchPost,
  setSearchUser,
  unLikeToSearchListPost,
} from "./Slices/searchSlice";
import Cookies from "js-cookie";
import {
  authenticationFailed,
  authenticationStarted,
  authenticationSucess,
  signInFailed,
  signInStarted,
  signInSuccess,
  signUpFailed,
  signUpStarted,
  signUpSuccess,
  signOffSuccess,
  followingStarted,
  followingSuccess,
  profileUpdatingStarted,
  profileUpdatingSuccess,
  profileUpdatingFailed,
  profileDeletingStarted,
  profileDeletingSuccess,
  profileDeletingFailed,
  forgetPasswordVerificationStarted,
  forgetPasswordVerificationSuccess,
  forgetPasswordVerificationFailed,
  setCheckUserNameMessage,
} from "./Slices/authSlice";
import {
  addLikeToProfilePost,
  deletePostFailed,
  deletePostStarted,
  deletePostSuccess,
  editingMyPostSuccess,
  followersStarted,
  getFollowUsersStarted,
  getFollowUsersSuccess,
  getMyPostsFailed,
  getMyPostsStarted,
  getProfileFailed,
  getProfileStarted,
  newPostAdded,
  setMyPosts,
  setNoMoreFollowUsers,
  setNoMoreMyPost,
  setProfile,
} from "./Slices/ProfileSlice";
import { getSocket, initiateSocketConnetion } from "./Socket";
import {
  newMessage,
  sendMessageFailed,
  sendMessageSuccess,
} from "./Slices/messageSlice";

// const baseURL = "https://icom-okob.onrender.com";
const baseURL = "http://localhost:5010";

//#region Account Service
function* signIn(action) {
  try {
    yield put(signInStarted());
    const res = yield call(axios.post, `${baseURL}/auth/login`, action.data);
    const token = res.data.accessToken;
    Cookies.set("auth_Token", token);
    yield put(signInSuccess(res.data));
    yield put(resetAllPosts());
  } catch (err) {
    console.log(err);
    yield put(signInFailed(err.response?.data?.message || "Sign in failed"));
  }
}

function* signUp(action) {
  try {
    yield put(signUpStarted());
    const res = yield call(axios.post, `${baseURL}/auth/register`, action.data);
    const token = res.data.accessToken;
    Cookies.set("auth_Token", token);
    yield put(signUpSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(signUpFailed(err.response.data.message));
  }
}

function* validateUser(action) {
  try {
    yield put(authenticationStarted());
    const res = yield call(axios.get, `${baseURL}/auth/validateUser`, {
      headers: {
        Authorization: `Bearer ${action.data}`,
      },
    });
    const token = res.data.accessToken;
    Cookies.set("auth_Token", token);
    yield put(authenticationSucess(res.data));
    yield put(resetAllPosts());
  } catch (err) {
    console.log(err.response);
    Cookies.remove("auth_Token");
    yield put(authenticationFailed(err.response.data.message));
  }
}

function* checkUserName(action) {
  try {
    const res = yield call(axios.post, `${baseURL}/auth/checkUserName`, {
      userName: action.data,
    });
    yield put(setCheckUserNameMessage(""));
  } catch (err) {
    yield put(setCheckUserNameMessage(err.response.data.message));
  }
}

function* signOff() {
  Cookies.remove("auth_Token");
  yield put(signOffSuccess());
  yield put(resetAllPosts());
}

function* deleteAccount(action) {
  try {
    yield put(profileDeletingStarted());
    const token = Cookies.get("auth_Token");
    const res = yield call(
      axios.delete,
      `${baseURL}/user/delete/${action.data._id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    Cookies.remove("auth_Token");
    yield put(profileDeletingSuccess());
  } catch (err) {
    console.log();
    yield put(profileDeletingFailed());
  }
}

//#region Main Page Post
function* getAllPosts(action) {
  const { page, totalPages, allPost } = action.data;
  if (page <= totalPages) {
    try {
      if (page === 1 && allPost.length === 0) {
        yield put(getAllPostsStarted());
      }
      const res = yield call(axios.get, `${baseURL}/post`, {
        params: {
          page: page,
        },
      });
      const { isAuth } = yield select((state) => state.auth);
      if (!isAuth) yield put(setAllPosts(res.data));
    } catch (err) {
      console.log(err);
      yield put(setNoMore());
    }
  } else {
    yield put(setNoMore());
  }
}

function* getFollingPosts(action) {
  const { page, totalPages, allPost } = action.data;
  if (page <= totalPages) {
    try {
      if (page === 1 && allPost.length === 0) {
        yield put(getAllPostsStarted());
      }
      const auth_token = Cookies.get("auth_Token");
      const res = yield call(axios.get, `${baseURL}/post/followingPost`, {
        params: {
          page: page,
        },
        headers: {
          Authorization: "Bearer " + auth_token,
        },
      });
      yield put(setAllPosts(res.data));
    } catch (err) {
      console.log(err);
      yield put(setNoMore());
    }
  } else {
    yield put(setNoMore());
  }
}

//#region Post Creation and Edit
function* createPost(action) {
  try {
    yield put(creatingPostStarted());
    const token = Cookies.get("auth_Token");
    const res = yield call(
      axios.post,
      `${baseURL}/post/create`,
      { ...action.data },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    yield put(creatingPostSuccess(res.data));
    yield put(closeCreatePostModel());
    yield put(newPostAdded(res.data));
  } catch (err) {
    console.log(err);
    yield put(creatingPostFailed());
  }
}

function* editPost(action) {
  try {
    yield put(editingPostStarted());
    const auth_token = Cookies.get("auth_Token");
    const res = yield call(
      axios.put,
      `${baseURL}/post/editPost/${action.data._id}`,
      action.data.createPost,
      {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
        params: {
          postId: action.data.createPost._id,
        },
      }
    );
    yield put(editingPostSuccess(action.data.createPost));
    yield put(editingMyPostSuccess(action.data.createPost));
    yield put(editingSearchPostSuccess(action.data.createPost));
    yield put(closeCreatePostModel());
  } catch (err) {
    console.log(err);
    yield put(editingPostFailed(err.response.data.message));
  }
}

function* reportPost(action) {
  try {
    yield put(reportToPostStarted());
    const res = yield call(
      axios.post,
      `${baseURL}/post/reportPost`,
      action.data
    );
    yield put(reportToPostSuccess());
  } catch (err) {
    yield put(reportToPostFailed(err.response.data.message));
  }
}

//#region Search
function* getSearchUser(action) {
  const { page, totalPages } = action.data;
  if (page <= totalPages) {
    try {
      if (page === 1) yield put(getSearchUserStarted());
      const res = yield call(axios.get, `${baseURL}/user`, {
        params: {
          search: action.data.value,
          page: page,
        },
      });
      yield put(setSearchUser(res.data));
    } catch (err) {
      console.log(err);
    }
  } else {
    yield put(setNoMoreUser());
  }
}

function* getSearchPost(action) {
  const { page, totalPages } = action.data;
  if (page <= totalPages) {
    try {
      if (page === 1) yield put(getSearchPostStarted());
      const res = yield call(axios.get, `${baseURL}/post`, {
        params: {
          search: action.data.value,
          page: page,
        },
      });
      yield put(setSearchPost(res.data));
    } catch (err) {
      console.log(err);
    }
  } else {
    yield put(setNoMorePost());
  }
}

//#region Display
function* viewPost(action) {
  try {
    yield put(getSinglePostStarted());
    const res = yield call(axios.get, `${baseURL}/post/${action.data.id}`);
    yield put(setSinglePost(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* getPostCommments(action) {
  try {
    const res = yield call(
      axios.get,
      `${baseURL}/post/${action.data.id}/comments`
    );
    yield put(setSinglePostComments(res.data));
  } catch (err) {
    console.log(err);
  }
}

function* commentPost(action) {
  const { commentdesc, postId } = action.data;
  try {
    yield put(addCommentToPost(action.data));
    const token = Cookies.get("auth_Token");
    const res = yield call(
      axios.post,
      `${baseURL}/post/${postId}/comment`,
      { ...commentdesc },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("Commented Successfully");
  } catch (err) {
    console.log(err);
  }
}

function* likePost(action) {
  try {
    yield put(
      addLikeToPost({ userId: action.data.userId, postId: action.data.postId })
    );
    yield put(
      addLikeToSearchListPost({
        userId: action.data.userId,
        postId: action.data.postId,
      })
    );
    yield put(
      addLikeToProfilePost({
        userId: action.data.userId,
        postId: action.data.postId,
      })
    );
    const auth_token = Cookies.get("auth_Token");
    const res = yield call(
      axios.post,
      `${baseURL}/post/like/${action.data.postId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

function* unlikePost(action) {
  try {
    yield put(
      unlikeToPost({ userId: action.data.userId, postId: action.data.postId })
    );
    yield put(
      unLikeToSearchListPost({
        userId: action.data.userId,
        postId: action.data.postId,
      })
    );
    const auth_token = Cookies.get("auth_Token");
    const res = yield call(
      axios.post,
      `${baseURL}/post/unlike/${action.data.postId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

//#region Profile
function* getMyPost(action) {
  const { page, totalPages, userId } = action.data;
  if (page <= totalPages) {
    try {
      if (page === 1) yield put(getMyPostsStarted());
      const res = yield call(
        axios.get,
        `${baseURL}/post/user/${userId}/posts`,
        {
          params: {
            page: page,
          },
        }
      );
      yield put(setMyPosts(res.data));
    } catch (err) {
      console.log(err);
      yield put(getMyPostsFailed(err.response.data.message));
      yield put(setNoMoreMyPost());
    }
  } else {
    yield put(setNoMoreMyPost());
  }
}

function* getProfile(action) {
  const { userId } = action.data;
  try {
    yield put(getProfileStarted());
    const res = yield call(axios.get, `${baseURL}/user`, {
      params: {
        id: userId,
      },
    });
    yield put(setProfile(res.data));
  } catch (err) {
    console.log(err);
    yield put(getProfileFailed(err.response.message));
  }
}

function* followProfile(action) {
  // console.log(action);
  const { authId, profileId } = action.data;
  try {
    yield put(followingStarted(profileId));
    yield put(followersStarted(authId));
    const auth_token = Cookies.get("auth_Token");
    const res = yield call(
      axios.put,
      `${baseURL}/follow`,
      {},
      {
        params: {
          userid: profileId,
        },
        headers: {
          Authorization: "Bearer " + auth_token,
        },
      }
    );
    console.log(res);

    yield put(followingSuccess(res.data.message));
  } catch (err) {
    console.log(err);
  }
}

function* updateProfile(action) {
  try {
    yield put(profileUpdatingStarted());
    const auth_token = Cookies.get("auth_Token");
    const res = yield call(
      axios.put,
      `${baseURL}/user/updateProfile/${action.data._id}`,
      action.data.profiledetails,
      {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
      }
    );
    yield put(profileUpdatingSuccess(res.data[0]));
  } catch (err) {
    console.log(err);
    yield put(profileUpdatingFailed(err.response.data.message));
  }
}

function* getFollowerUser(action) {
  const { page, totalPages, _id } = action.data;
  if (page <= totalPages) {
    try {
      if (page === 1) yield put(getFollowUsersStarted());
      const res = yield call(axios.get, `${baseURL}/user/follower`, {
        params: {
          userId: _id,
          page: page,
        },
      });
      yield put(getFollowUsersSuccess(res.data));
    } catch (err) {
      console.log(err);
      yield put(setNoMoreFollowUsers());
    }
  } else {
    yield put(setNoMoreFollowUsers());
  }
}

function* getFollowingUser(action) {
  const { page, totalPages, _id } = action.data;

  if (page <= totalPages) {
    try {
      if (page === 1) yield put(getFollowUsersStarted());
      const res = yield call(axios.get, `${baseURL}/user/following`, {
        params: {
          userId: _id,
          page: page,
        },
      });
      yield put(getFollowUsersSuccess(res.data));
    } catch (err) {
      console.log(err);
      yield put(setNoMoreFollowUsers());
    }
  } else {
    yield put(setNoMoreFollowUsers());
  }
}

function* deletePost(action) {
  const { postId } = action.data;
  try {
    yield put(deletePostStarted());
    const token = Cookies.get("auth_Token");
    const res = yield call(axios.delete, `${baseURL}/post/delete/${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    yield put(deletePostSuccess(postId));
    yield put(deleteUserPost(postId));
  } catch (err) {
    yield put(deletePostFailed(err.response.data.message));
  }
}

//#region Forget Password Service
function* sendOTP(action) {
  try {
    yield put(forgetPasswordVerificationStarted());
    const res = yield call(
      axios.post,
      `${baseURL}/user/send-otp`,
      { email: action.data },
      {}
    );
    yield put(forgetPasswordVerificationSuccess());
  } catch (err) {
    console.log(err);
    yield put(forgetPasswordVerificationFailed(err.response.data.message));
  }
}

function* verifyOTP(action) {
  try {
    yield put(forgetPasswordVerificationStarted());
    const res = yield call(
      axios.post,
      `${baseURL}/user/verify-otp`,
      action.data,
      {}
    );
    yield put(forgetPasswordVerificationSuccess());
  } catch (err) {
    console.log(err);
    yield put(forgetPasswordVerificationFailed(err.response.data.message));
  }
}

function* changePassword(action) {
  try {
    yield put(forgetPasswordVerificationStarted());
    const res = yield call(
      axios.put,
      `${baseURL}/auth/changePassword`,
      action.data,
      {}
    );
    yield put(forgetPasswordVerificationSuccess());
    yield* signOff();
  } catch (err) {
    console.log(err);
    yield put(forgetPasswordVerificationFailed(err.response.data.message));
  }
}

//#region Message Service
function createSocketChannel(socket) {
  //The eventChannel takes a function as its argument. Inside this function, you define how the channel should react to external events. Specifically, the function listens to the Socket.IO events and calls the emit function to pass the data to the saga.

  //emit is like a bridge to send data from the external event (like Socket.IO messages) to your saga, which will then handle it within Redux.
  return eventChannel((emit) => {
    socket.on("new_message", (message) => {
      emit({ type: "NEW_MESSAGE", playload: message });
    });
    return () => {
      socket.off("new_message");
    };
  });
}

function* initSocket() {
  try {
    const socket = yield call(initiateSocketConnetion);
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      //The take(socketChannel) effect pauses the saga and waits until the channel emits something (i.e., a newMessage event).
      //When the server sends the newMessage, it resumes the saga by assigning the emitted value ({ type: 'NEW_MESSAGE', payload: message }) to the action variable.
      const action = yield take(socketChannel);
      console.log(action);

      yield put(newMessage(action.playload));
    }
  } catch (err) {
    console.log(err);
  }
}

function* sendMessage(action) {
  try {
    const socket = yield call(getSocket);
    socket.emit("privateMessage", action.data);
    yield put(sendMessageSuccess());
  } catch (err) {
    yield put(sendMessageFailed(err.message));
  }
}

function* joinMessageRoom(action) {
  try {
    const socket = yield call(getSocket);
    socket.emit("joinRoom", action.data);
    console.log("Room Joined Successfully");
  } catch (err) {
    console.log(err);
  }
}

//#region root
function* rootSaga() {
  yield fork(initSocket); //start socket connection
  //fork instead of call. fork is a non-blocking effect, meaning that it will allow other effects to run in parallel without waiting for initSocket to complete.
  yield takeLatest("GET_ALL_POSTS", getAllPosts);
  yield takeLatest("GET_FOLLOWING_POSTS", getFollingPosts);
  yield takeLatest("VIEW_POST", viewPost);
  yield takeLatest("GET_POST_COMMENTS", getPostCommments);
  yield takeLatest("GET_SEARCH_USER", getSearchUser);
  yield takeLatest("GET_SEARCH_POST", getSearchPost);
  yield takeLatest("SIGN_IN", signIn);
  yield takeLatest("SIGN_UP", signUp);
  yield takeLatest("VALIDATE_USER", validateUser);
  yield takeLatest("CHECK_USER_NAME", checkUserName);
  yield takeLatest("SIGN_OFF", signOff);
  yield takeLatest("COMMENT_POST", commentPost);
  yield takeLatest("LIKE_POST", likePost);
  yield takeLatest("UNLIKE_POST", unlikePost);
  yield takeLatest("EDIT_POST", editPost);
  yield takeLatest("REPORT_POST", reportPost);
  yield takeLatest("GET_MY_POST", getMyPost);
  yield takeLatest("GET_PROFILE", getProfile);
  yield takeLatest("FOLLOW_PROFILE", followProfile);
  yield takeLatest("UPDATE_PROFILE", updateProfile);
  yield takeLatest("DELETE_ACCOUNT", deleteAccount);
  yield takeLatest("CREATE_POST", createPost);
  yield takeLatest("GET_FOLLOWER_USERS", getFollowerUser);
  yield takeLatest("GET_FOLLOWING_USERS", getFollowingUser);
  yield takeLatest("DELETE_POST", deletePost);
  yield takeLatest("SEND_OTP", sendOTP);
  yield takeLatest("VERIFY_OTP", verifyOTP);
  yield takeLatest("CHANGE_PASSWORD", changePassword);
  yield takeLatest("JOIN_MESSAGE_ROOM", joinMessageRoom);
  yield takeLatest("SEND_MESSAGE_REQUEST", sendMessage);
}

export default rootSaga;
