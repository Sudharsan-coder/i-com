import { styled } from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconHeartPlus } from "@tabler/icons-react";

const Likes = (props) => {
  const [Liked, setLiked] = useState(false);
  // console.log(props);
  
  const [like,setLike]=useState(props.likeCount);
  return (
    <Container>
      <div className='like_container'>
        <div
          className='like'
          onClick={() => {
            setLiked(!Liked);
            console.log(Liked);
            if (!Liked) {
              setLike(like+1);
              axios
                .put(`http://localhost:5010/post/liked?postid=${props._id}`)
                .then(() => {
                  console.log("success");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
            setLike(like-1);
              axios
                .put(`http://localhost:5010/post/unliked?postid=${props._id}`)
                .then(() => {
                  console.log("success");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        >
          {Liked ? (
            <AiFillHeart
              size='20px'
              color='red'
            />
          ) : (
            <IconHeartPlus size='20px' />
          )}
          <div className='num'>
            {like > 10 ? "10+" : like}
          </div>
        </div>
        <div
          className='comment'
          id='#comment'
        >
          <Link to={`/post/${props._id}`}>
            <FaRegCommentDots
              size='17px'
              color='black'
            />
          </Link>
            <div className="num">
              {props.commentCount}
            </div>
        </div>
      </div>
    </Container>
  );
};

export default Likes;

const Container = styled.div`
  .like_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 90px;
    height: 20px;
    .like {
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 5s ease;
    }
    .comment{
     text-align: center;
     display: flex;
      align-items: center;
     }
    }
  }
`;
