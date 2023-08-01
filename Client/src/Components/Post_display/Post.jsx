import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import User_det from "../Post/User_detail.jsx";
import Heading from "../Post/Heading.jsx";
import Content from "../Post_create/Content.jsx";
import Comment from "./Comments.jsx";
import { useParams } from "react-router";
import axios from "axios";
const Post = () => {
  const params = useParams();
  const postid = params.id;
  const [postdetails, setPostDetails] = useState(null);
  console.log(postid);
  useEffect(() => {
    axios
      .get(`http://localhost:5010/post?postid=${postid}`)
      .then((res) => {
        setPostDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(postdetails);
  return (
    <Container>
      <div className="banner"></div>
      {postdetails && (
        <div className="main">
          <User_det {...postdetails} />
          <Heading {...postdetails} />
          <Content {...postdetails} />
          <Comment {...postdetails} />
        </div>
      )}
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
    background: black;
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
