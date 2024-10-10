import { styled } from "styled-components";
import { useEffect } from "react";
import Banner from "../Components/Profile/Banner.jsx";
import Main_profile from "../Components/Profile/Main_profile.jsx";
import { useParams } from "react-router-dom";
import Main_post from "../Components/Post/Main_post.jsx";
import ProfilepageLoading from "../Components/Loading/ProfilepageLoading.jsx";
import MainpageLoading from "../Components/Loading/MainpageLoading.jsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../Components/Profile/Counter.jsx";
import { resetMyPosts } from "../Redux/Slices/ProfileSlice.js";
import { resetMessageList } from "../Redux/Slices/messageSlice.js";

const Profile_page = () => {
  const { isGettingProfile, isGettingMyPosts, myposts, profile } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    dispatch(resetMessageList())
    dispatch(resetMyPosts());
  }, [id, dispatch]);

  useEffect(() => {
    // Fetch profile and posts only after posts are reset
    if (myposts.data.length === 0) {
      fetchProfile();
      fetchMyPosts();
    }
  }, [myposts.data.length, id, dispatch]);

  const fetchProfile = () => {
    dispatch({ type: "GET_PROFILE", data: { userId: id } });
  };

  const fetchMyPosts = () => {
    dispatch({
      type: "GET_MY_POST",
      data: { page: myposts.page, totalPages: myposts.totalPages, userId: id,type:"myPost" },
    });
  };

  return (
    <Container>
      <Banner />
      {isGettingProfile ? (
        <ProfilepageLoading />
      ) : (
        <>
          <Main_profile {...profile} />
          <Counter {...profile} />
        </>
      )}

      <Content>
        {isGettingMyPosts ? (
          <MainpageLoading />
        ) : myposts.data.length !== 0 ? ( // Assuming myposts.data is an array
          <Main_post
            allPost={myposts.data}
            fetchData={fetchMyPosts}
            hasmore={myposts.more}
          />
        ) : (
          <h1 className="noData" style={{textAlign:'center'}}>No Post</h1>
        )}
      </Content>
    </Container>
  );
};

export default Profile_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.6fr 0.5fr 1.5fr 0.6fr;
`;

const Content = styled.div`
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  gap: 20px;
`;
