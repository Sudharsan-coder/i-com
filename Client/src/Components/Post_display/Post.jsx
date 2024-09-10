import { styled } from "styled-components";
import User_det from "../Post/User_detail.jsx";
import Heading from "../Post/Heading.jsx";
import Content from "../Post_create/Content.jsx";
import Comment from "./Comments.jsx";
import React from "react";
const Post = (props) => {
  return (
    <Container banner={props.post.bannerPic}>
      <div className='banner'></div>

      <div className='main'>
        <User_det {...props.post} />
        <Heading {...props.post} />
        <Content {...props.post} />
        <Comment postid = {props.post._id} commentArray = {props.commentArray} />
      </div>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  grid-column: 2;
  background: #ffffff;
  height: fit-content;
  margin: 3% 1%;
  border-radius: 15px;
  overflow: hidden;
  .banner {
    background: ${(props) =>
      props !== undefined ? `url(${props.banner})` : "black"};
    background-size: cover;
    background-repeat: no-repeat;
    height: 50vh;
    /* margin: 0px -50px; */
  }
  .main {
    padding: 15px 50px;
    .heading {
      font-size: 2em;
    }
  }
`;
