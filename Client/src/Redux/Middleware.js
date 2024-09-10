import { put, takeLatest, call } from "redux-saga/effects";
import {
  addCommentToPost,
  addLikeToPost,
  creatingPostFailed,
  creatingPostStarted,
  creatingPostSuccess,
  getAllPostsStarted,
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
} from "./Slices/authSlice";
import {
  followersStarted,
  getMyPostsFailed,
  getMyPostsStarted,
  getProfileFailed,
  getProfileStarted,
  newPostAdded,
  setMyPosts,
  setNoMoreMyPost,
  setProfile,
} from "./Slices/ProfileSlice";

// const baseURL = "https://icom-okob.onrender.com";
const baseURL = "http://localhost:5010";

function* signIn(action) {
  try {
    yield put(signInStarted());
    const res = yield call(axios.post, `${baseURL}/auth/login`, action.data);
    const token = res.data.accessToken;
    Cookies.set("auth_Token", token);
    yield put(signInSuccess(res.data));
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
    yield put(signUpFailed(err.response.message));
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
  } catch (err) {
    console.log(err.response);
    Cookies.remove("auth_Token");
    yield put(authenticationFailed(err.response.data.message));
  }
}

function* signOff(action) {
  Cookies.remove("auth_Token");
  yield put(signOffSuccess());
  yield put(resetAllPosts());
}

function* deleteAccount(action) {
  try {
    yield put(profileDeletingStarted());
    const token = Cookies.get("auth_Token");
    const res = yield call(axios.delete, `${baseURL}/user/delete`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    Cookies.remove("auth_Token");
    yield put(profileDeletingSuccess());
  } catch (err) {
    console.log();
    yield put(profileDeletingFailed());
  }
}
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
      yield put(setAllPosts(res.data));
    } catch (err) {
      console.log(err);
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
    }
  } else {
    yield put(setNoMore());
  }
}

function* viewPost(action) {
  try {
    const res = yield call(axios.get, `${baseURL}/post/${action.data.id}`);
    yield put(setSinglePost(res.data));
  } catch (err) {
    console.log(err);
  }
}

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
    yield put(newPostAdded(res.data))
  } catch (err) {
    console.log(err);
    yield put(creatingPostFailed());
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
      `${baseURL}/user/updateProfile`,
      action.data,
      {
        headers: {
          Authorization: "Bearer " + auth_token,
        },
      }
    );
    yield put(profileUpdatingSuccess(res.data[0]));
  } catch (err) {
    console.log(err);
    yield put(profileUpdatingFailed());
  }
}

function* rootSaga() {
  yield takeLatest("GET_ALL_POSTS", getAllPosts);
  yield takeLatest("GET_FOLLOWING_POSTS", getFollingPosts);
  yield takeLatest("VIEW_POST", viewPost);
  yield takeLatest("GET_POST_COMMENTS", getPostCommments);
  yield takeLatest("GET_SEARCH_USER", getSearchUser);
  yield takeLatest("GET_SEARCH_POST", getSearchPost);
  yield takeLatest("SIGN_IN", signIn);
  yield takeLatest("SIGN_UP", signUp);
  yield takeLatest("VALIDATE_USER", validateUser);
  yield takeLatest("SIGN_OFF", signOff);
  yield takeLatest("COMMENT_POST", commentPost);
  yield takeLatest("LIKE_POST", likePost);
  yield takeLatest("UNLIKE_POST", unlikePost);
  yield takeLatest("GET_MY_POST", getMyPost);
  yield takeLatest("GET_PROFILE", getProfile);
  yield takeLatest("FOLLOW_PROFILE", followProfile);
  yield takeLatest("UPDATE_PROFILE", updateProfile);
  yield takeLatest("DELETE_ACCOUNT", deleteAccount);
  yield takeLatest("CREATE_POST",createPost);
}

export default rootSaga;
