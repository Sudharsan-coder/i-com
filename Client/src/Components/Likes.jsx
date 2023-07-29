import React from "react";
import { styled } from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useState,useRef } from "react";
import { Link } from "react-router-dom";

const Likes = () => {
    const [Liked, setLiked] = useState(false);
    const num=useRef(10);
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
        onClick={() => {
          setLiked(!Liked);
          if(Liked)
          num.current-=1;
          else
          num.current+=1;
        }}
      >
        {Liked ? <AiFillHeart size="20px" color="red"/> : <AiOutlineHeart size="20px"/>}
        <div className="num">{num.current}</div>
      </div>
      <div className="comment" onClick={(event)=>{ScroolTo(event,"comment")}}>
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
