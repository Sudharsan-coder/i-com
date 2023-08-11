import { useState } from "react"; // Make sure to import React
import { styled } from "styled-components";
import Single_comment from "./Single_comment";
import { useAuth } from "../../context/auth";
import { IconSend } from "@tabler/icons-react";
import axios from "axios";

const Comments = (props) => {
  const auth = useAuth();
  const commentArray = [...props.comments];
  // const a=[1,2,3,4,5];
  // console.log(auth.user);
  const [commentdesc, setCommentdesc] = useState({
    username: `${auth.user.username}`,
    comments: "",
    profile: `${auth.user.profile}`,
  });
  console.log(commentdesc);
  const handleSubmit = (e) => {
    e.preventDefault();
    commentdesc.comment = "";
    axios
      .put(
        `http://localhost:5010/post/AddComment?postid=${props._id}`,
        commentdesc
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <div
        className='head'
        id='comment'
      >
        Commands
      </div>
      <Comment onSubmit={handleSubmit}>
        <img
          src={auth.user.profile? auth.user.profile:"https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
          alt='me'
        />
        <textarea
          placeholder='Add to the discussion'
          value={commentdesc.comments}
          onChange={(e) => {
            setCommentdesc({ ...commentdesc, comments: e.target.value });
          }}
        />
        <button type='submit'>
          <IconSend />
        </button>
      </Comment>
      {/* Use parentheses to wrap the map function body */}
      {commentArray.reverse().map((data) => (
        <Single_comment
          key={data._id}
          {...data}
        />
      ))}
    </Container>
  );
};

export default Comments;

const Container = styled.div`
  .head {
    font-size: 1.5em;
    font-weight: bold;
    margin: 50px 0px;
  }
`;
const Comment = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  img {
    background: black;
    height: 45px;
    width: 50px;
    border-radius: 100%;
  }
  textarea {
    width: 90%;
    height: 100px;
  }
  button {
    color: white;
    background-color: #4162e9;
    border: none;
    padding: 10px;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
  }
`;
