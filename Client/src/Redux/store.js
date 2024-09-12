import { configureStore } from "@reduxjs/toolkit";
import publicPostsSlice from "./Slices/publicPostsSlice";
import searchSlice from "./Slices/searchSlice";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./Middleware";
import authSlice from "./Slices/authSlice";
import ProfileSlice from "./Slices/ProfileSlice";
import messageSlice from "./Slices/messageSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        publicPosts:publicPostsSlice,
        search:searchSlice,
        auth:authSlice,
        profile:ProfileSlice,
        message:messageSlice,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)
export default store