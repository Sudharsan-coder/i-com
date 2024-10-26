import { useState } from "react";
import { styled } from "styled-components";
import Single_comment from "./Single_comment";
import { IconSend } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mantine/core";

const Comments = (props) => {
  const commentArray = [...props.commentArray].reverse();
  const { user, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState(""); // Simplified state for the comment text

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuth) {
      navigate("/sign_in");
      return;
    }

    // Prepare comment object
    const commentdesc = {
      user: {
        _id: user._id,
        profilePicUrl: user.profilePicUrl,
        userName: user.userName,
      },
      text: commentText,
    };

    // Dispatch the comment action
    dispatch({
      type: "COMMENT_POST",
      data: { commentdesc, postId: props.postid },
    });

    // Clear the comment text after submission
    setCommentText("");
  };
  const { userName = "" } = user || {};
  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();

  return (
    <Container>
      <div
        className='head'
        id='comment'
      >
        Commands
      </div>
      <Comment onSubmit={handleSubmit}>
        <Avatar
          radius={"xl"}
          size={50}
          src={user.profilePicUrl}
          color='blue'
          alt='me'
        >
          {profilePicName}
        </Avatar>
        <textarea
          placeholder='Add your discussion'
          value={commentText} // Bind to the simplified state
          onChange={(e) => setCommentText(e.target.value)} // Update the text state
        />
        <button type='submit'>
          <IconSend />
        </button>
      </Comment>
      {/* Use parentheses to wrap the map function body */}
      {commentArray &&
        commentArray.map((data) => (
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
    margin: 20px 0px;
  }
`;
const Comment = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  textarea {
    width: 90%;
    height: 50px;
    padding: 12px 20px;
    border-radius: 10px;
    &:focus {
      border: 1px solid #1a89ea;
      outline: none;
    }
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
