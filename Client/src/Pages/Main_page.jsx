import { useCallback, useEffect, useState } from "react";
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";
import MainpageLoading from "../Components/Loading/MainpageLoading";
import ProfileCard from "../Components/Profile/ProfileCard";
import TopRecentTag from "../Components/Post/TopRecentTag";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAllPosts } from "../Redux/Slices/publicPostsSlice";
import FollowingTag from "../Components/Auth/FollowingTag";
import Log_in_card from "../Components/Auth/Log_in_card";
const Main_page = () => {
  const dispatch = useDispatch();
  const { allPost, page, isGettingAllPost, totalPages, more } = useSelector(
    (state) => state.publicPosts
  );
  const { isAuth,user } = useSelector((state) => state.auth);

  // Fetch posts when page or isAuth changes
  useEffect(() => {
    if (page === 1 && allPost.length === 0) {
      fetchAllPosts();
    }
  }, [page, isAuth]);

  const fetchAllPosts = () => {
    return isAuth
      ? dispatch({
          type: "GET_FOLLOWING_POSTS",
          data: { allPost, page, totalPages },
        })
      : dispatch({
          type: "GET_ALL_POSTS",
          data: { allPost, page, totalPages },
        });
  };

  return (
    <>
      <Container>
        {isAuth ? <ProfileCard userDetail={user} gridColumn={1} gridRow={2} /> : <Log_in_card/>}
        {isGettingAllPost ? (
          <MainpageLoading />
        ) : allPost.length !== 0 ? (
          <>
          <FollowingTag/>
          <Main_post
            allPost={allPost}
            fetchData={fetchAllPosts}
            hasmore={more}
            />
          </>
        ) : isAuth ? (
          <NotFound>
            <h1>Follow the Peoples</h1>
          </NotFound>
        ) : (
          <NotFound>
            <h1>No Data</h1>
          </NotFound>
        )}
        <TopRecentTag />
      </Container>
    </>
  );
};

export default Main_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.7fr 2fr 0.8fr;
  /* grid-row-gap: 50px; */
`;

const NotFound = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 6rem;
    color: #b8b9ba;
  }
`;
