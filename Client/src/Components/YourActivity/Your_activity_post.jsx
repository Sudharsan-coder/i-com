import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetMyPosts } from "../../Redux/Slices/ProfileSlice";
import MainpageLoading from "../Loading/MainpageLoading";
import Main_post from "../Post/Main_post";
import { useNavigate, useParams } from "react-router-dom";

const Your_activity_post = () => {
  const params = useParams();
  const { activity_type } = params;
  const { isGettingMyPosts, myposts } = useSelector((state) => state.profile);
  const { user, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/sign_in");
    dispatch(resetMyPosts());
  }, [dispatch, activity_type]);

  useEffect(() => {
    if (myposts.page === 1) {
      fetchMyPosts();
    }
  }, [myposts.page,activity_type]);
  
  const fetchMyPosts = () => {
    dispatch({
      type: "GET_MY_POST",
      data: {
        page: myposts.page,
        totalPages: myposts.totalPages,
        userId: user._id,
        type: activity_type,
      },
    });
  };

  return (
    <Container>
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
          <h1
            className='noData'
            style={{ textAlign: "center" }}
          >
            No Post
          </h1>
        )}
      </Content>
    </Container>
  );
};

export default Your_activity_post;

const Container = styled.div`
  grid-column: 2;
`;
const Content = styled.div``;
