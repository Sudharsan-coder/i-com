import React, { useEffect, useState } from 'react'
import { FaRegBookmark,FaBookmark  } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Save_post = (props) => {
  const postDetail = props.postDetail
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(
    user._id? postDetail.savedUser.includes(user?._id): postDetail.savedUser.includes("") // Check if user ID is in the savedUser array
  );
  

  useEffect(() => {
    // Update saved state if the savedUser prop changes
    setSaved(user._id? postDetail.savedUser.includes(user?._id): postDetail.savedUser.includes(""));
  }, [postDetail.savedUser, user?._id]);

  const handleClick = () => {
    // console.log(saved);
    if (!user?._id) navigate("/sign_in");
    else{
      setSaved(!saved);
      if (!saved) {
        dispatch({
          type: "SAVE_POST",
          data: { userId: user._id, postId: postDetail._id },
        });
      } else {
        dispatch({
          type: "UNSAVE_POST",
          data: { userId: user._id, postId: postDetail._id },
        });
      }
    } 
  };
  return (
    <Container onClick={handleClick}>
      {saved ? <FaBookmark/> :<FaRegBookmark  />}
    </Container>
  )
}

export default Save_post

const Container = styled.div`
    cursor: pointer;
`