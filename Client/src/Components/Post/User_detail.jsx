//has the user info for the post
import { styled } from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import user_pic from "../../assets/logo.png"

const User_detail = () => {
  const [ Liked, setLiked ] = useState(false);
  return (
    <Container>
      <div className="frame1">
        <img src={user_pic} alt="pic" />
        <div className="frame1_content">
        <div className="user_name">Sudharsan</div>
        <div className="date">Posted on 22 Jan</div>
        </div>
      </div>
      <div className="heading">Introduction to Machine Learning basics</div>
      <div className="icons">
        <div
          className="like"
          onClick={() => {
            setLiked(!Liked);
          }}
        >
          {Liked ?  <FcLike size="20px"/> : <AiOutlineHeart size="20px"/>}
        </div>
        <div className="comment">
          <FaRegCommentDots size="20px"/>
        </div>
      </div>
    </Container>
  );
};

export default User_detail;

const Container = styled.div`
        display: flex;
        flex-direction: column;
        padding:5% 2%;
        .frame1{
            display: flex;
            align-items: center;
            img{
                height: 50px;
                width:50px;
                border-radius: 15px;
            }
            .user_name{
                font-size: 1.2em;
            }
            .frame1_content{
                margin-left:15px;
            }
            .date{
                color:rgb(113, 113, 113);
                font-size: 0.9em;
            }
        }
        .heading{
            font-size:1.8em;
            margin-left: 65px;
            padding:20px 0px;
        }
        .icons{
            display: flex;
            justify-content: space-between;
            width: 10%;
            height: 20px;
            margin-left: 65px;
            .like{
                cursor: pointer;
            }
        }
`;
