import { styled } from "styled-components";
import Like_pallet from "../Components/Post_display/Like_pallet.jsx";
import Post from "../Components/Post_display/Post.jsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostdisplayLoading from "../Components/Loading/PostdisplayLoading.jsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePostStarted,
  resetPost,
  setSinglePost,
} from "../Redux/Slices/publicPostsSlice.js";
import ProfileCard from "../Components/Profile/ProfileCard.jsx";
import Main_page_footer from "../Components/Main_page_footer.jsx";
import IDS_sponsor from "../Components/Sponsor_cards/IDS_sponsor.jsx";
const Post_page_display = () => {
  const params = useParams();
  const postid = params.id;
  const { isGettingSinglePost, post, allPost } = useSelector(
    (state) => state.publicPosts
  );
  const { mypost } = useSelector((state) => state.profile);
  const { searchPosts } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPost());
    const inAllPost = allPost?.find((data) => data._id === postid);
    const inMyPost = mypost?.data?.find((data) => data._id === postid);
    const inSearchPost = searchPosts?.find((data) => data._id === postid);

    if (inAllPost) {
      dispatch(setSinglePost(inAllPost));
    } else if (inMyPost) {
      dispatch(setSinglePost(inMyPost));
    } else if (inSearchPost) {
      dispatch(setSinglePost(inSearchPost));
    } else {
      dispatch({
        type: "VIEW_POST",
        data: {
          id: postid,
        },
      });
    }

    dispatch({ type: "GET_POST_COMMENTS", data: { id: postid } });
  }, []);
  return (
    <Container>
      {isGettingSinglePost ? (
        <PostdisplayLoading />
      ) : (
        <>
          <LeftColumn>
            <Like_pallet {...post.data} />
          </LeftColumn>
          <MiddleColumn>
            <Post
              post={post.data}
              commentArray={post.comments.data}
            />
          </MiddleColumn>
          <RightColumn>
            <ProfileCard userDetail={post.data.user} />
            <IDS_sponsor />
            <Main_page_footer />
          </RightColumn>
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

const LeftColumn = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

const MiddleColumn = styled.div`
  grid-column: 2;
`;

const RightColumn = styled.div`
  grid-column: 3;
  grid-row: 1;
`;
