import React, { useEffect } from "react";
import { styled } from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useState,useRef } from "react";
import { Link } from "react-router-dom";

const Likes = (props) => {
  const [Liked, setLiked] = useState(false);
    
    function ScroolTo(event, item) {
      event.preventDefault();
      document
        .getElementById(item)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
   
  return (
    <Container>
      <div className="like_container">
      <div
        className="like"
        // onClick={() => {
        //   setLiked(!Liked);
        //   if(Liked)
        //   //decrease the like count by one
        //   else
        //   //increase the like count by one
        // }}
      >
        {Liked ? <AiFillHeart size="20px" color="red"/> : <AiOutlineHeart size="20px"/>}
        <div className="num">{props.likeCount}</div>
      </div>
      <div className="comment" id="#comment" onClick={(event)=>{ScroolTo(event,"comment")}}>
        <Link to="/post"><FaRegCommentDots size="20px" color="black"/></Link>
      </div>
      </div>
    </Container>
  );
};

export default Likes;

const Container=styled.div`
.like_container{
   display: flex;
    justify-content: space-between;
    width: 90px;
    height: 20px;
    .like {
      cursor: pointer;
      display: flex;
      transition: all 5s ease;
    }
  }
`
