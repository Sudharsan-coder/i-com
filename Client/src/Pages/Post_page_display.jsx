import { styled } from "styled-components";
import Like_pallet from "../Components/Post_display/Like_pallet.jsx";
import Post from "../Components/Post_display/Post.jsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostdisplayLoading from "../Components/Loading/PostdisplayLoading.jsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePostStarted, setSinglePost } from "../Redux/Slices/publicPostsSlice.js";
const Post_page_display = () => {
  const params = useParams();
  const postid = params.id;
  const { isGettingSinglePost, post, allPost } = useSelector(
    (state) => state.publicPosts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSinglePostStarted())
    if (allPost.length !== 0) {
      const posts = allPost.find((data) => data._id == postid);
      dispatch(setSinglePost(posts));
    } else {
      dispatch({
        type: "VIEW_POST",
        data: {
          id: postid,
        },
      });
    }
    if(post.comments.page==1)
      dispatch({ type: "GET_POST_COMMENTS", data: { id: postid } });
  }, []);
  return (
    <Container>
      {isGettingSinglePost ? (  
        <PostdisplayLoading />
      ) : (
      <>
        <Like_pallet {...post.data} />
        <Post
          post={post.data}
          commentArray={post.comments.data}
        />
      </>
      )}
    </Container>
  );
};
export default Post_page_display;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.3fr 3fr 1fr;
  background: rgb(245, 245, 245);
`;
