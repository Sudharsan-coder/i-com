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
        <hr></hr>
        <Comment
          postid={props.post._id}
          commentArray={props.commentArray}
        />
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
  box-shadow: 0px 0.3px 2.2px rgba(0, 0, 0, 0.02),
    0px 0.8px 5.3px rgba(0, 0, 0, 0.028), 0px 1.5px 10px rgba(0, 0, 0, 0.035),
    0px 2.7px 17.9px rgba(0, 0, 0, 0.042), 0px 5px 33.4px rgba(0, 0, 0, 0.05),
    0px 12px 80px rgba(0, 0, 0, 0.07);

  .banner {
    display: ${(props) => (props.banner ? "block" : "none")};
    background-image: ${(props) => `url("${props.banner}")`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 50vh;
  }

  .main {
    padding: 15px 50px;

    .heading {
      font-size: 2em;
    }
  }
`;
