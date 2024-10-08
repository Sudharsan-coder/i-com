import { useEffect } from "react";
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";
import MainpageLoading from "../Components/Loading/MainpageLoading";
import ProfileCard from "../Components/Profile/ProfileCard";
import TopRecentTag from "../Components/Post/TopRecentTag";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowingTag from "../Components/Auth/FollowingTag";
import Log_in_card from "../Components/Auth/Log_in_card";
import Main_page_footer from "../Components/Main_page_footer";
import PopularPost from "../Components/PopularPost";
import IDS_sponsor from "../Components/Sponsor_cards/IDS_sponsor";
const Main_page = () => {
  const dispatch = useDispatch();
  const { allPost, page, isGettingAllPost, totalPages, more } = useSelector(
    (state) => state.publicPosts
  );
  const { isAuth, user } = useSelector((state) => state.auth);

  // Fetch posts when page or isAuth changes
  useEffect(() => {
    if (page === 1 && allPost.length === 0) {
      fetchAllPosts();
    }
  }, [page, isAuth]);

  useEffect(() => {
    dispatch({ type: "GET_POPULAR_POST" });
    dispatch({ type: "GET_POPULAR_TAGS" });
  }, []);

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
        <LeftColumn>
          {isAuth ? <ProfileCard userDetail={user} /> : <Log_in_card />}
          <IDS_sponsor />
          <Main_page_footer />
        </LeftColumn>
        <MiddleColumn isfollingTagsAvailable={user.followingHashTags !== 0}>
          {isGettingAllPost ? (
            <MainpageLoading />
          ) : (
            <>
              {isAuth && user?.followingHashTags !== 0 && <FollowingTag />}
              {allPost.length !== 0 ? (
                <Main_post
                  allPost={allPost}
                  fetchData={fetchAllPosts}
                  hasmore={more}
                />
              ) : isAuth ? (
                <NotFound>
                  <h1>Follow the Peoples</h1>
                </NotFound>
              ) : (
                <NotFound>
                  <h1>No Data</h1>
                </NotFound>
              )}
            </>
          )}
        </MiddleColumn>
        <RightColumn>
          <TopRecentTag />
          <PopularPost />
        </RightColumn>
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

const LeftColumn = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

const MiddleColumn = styled.div`
  grid-column: 2;
  display: ${(props) => (props.isfollingTagsAvailable ? "block" : "grid")};
  grid-template-rows: 90px auto;
`;

const RightColumn = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  h1 {
    font-size: 6rem;
    color: #b8b9ba;
  }
`;
