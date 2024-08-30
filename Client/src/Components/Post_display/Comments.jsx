import { useState } from "react";
import { styled } from "styled-components";
import Single_comment from "./Single_comment";
import { useAuth } from "../../context/auth";
import { IconSend } from "@tabler/icons-react";
import axios from "axios";

const Comments = (props) => {
  const auth = useAuth();
  // console.log(props);
  // console.log(auth.user._id);
  const [commentdesc, setCommentdesc] = useState({
    user: {
      _id: `${auth.user._id}`,
      profilePicUrl: `${auth.user.profilePicUrl}`,
      userName: `${auth.user.userName}`,
    },
    text: "",
  });
  // console.log(props.postid);
  const commentArray = props.commentArray;
  // console.log(commentArray);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(commentdesc.user===undefined)
    commentdesc.user._id = auth.user._id;
    axios
      .post(
        `https://icom-okob.onrender.com/post/${props.postid}/comment`,
        { user: commentdesc.user._id, text: commentdesc.text },
        {
          headers: {
            token: `Bearer ${auth.user.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        commentdesc.text = "";
      })
      .catch((error) => {
        console.log("Error status:", error.response.status);
        if(error.response.status == 403)
        {
              auth.setShowModel(true);
              auth.modelOC.open();
        }
        // auth.setShowModel(true);
        // console.log(auth.showModel);
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
          src={
            auth.user.profilePicUrl
              ? auth.user.profilePicUrl
              : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }
          alt='me'
        />
        <textarea
          placeholder='Add to the discussion'
          value={commentdesc.comments}
          onChange={(e) => {
            setCommentdesc({ ...commentdesc, text: e.target.value });
          }}
        />
        <button type='submit'>
          <IconSend />
        </button>
      </Comment>
      {/* Use parentheses to wrap the map function body */}
      {commentArray && commentArray.map((data) => (
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
