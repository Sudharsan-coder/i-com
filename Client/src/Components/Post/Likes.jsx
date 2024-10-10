import { styled } from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconHeartPlus } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
const Likes = (props) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Liked, setLiked] = useState(
    user._id? props.likes.includes(user?._id): props.likes.includes("") // Check if user ID is in the likes array
  );
  

  useEffect(() => {
    // Update Liked state if the likes prop changes
    setLiked(user._id? props.likes.includes(user?._id): props.likes.includes(""));
  }, [props.likes, user?._id]);

  const handleClick = () => {
    // console.log(Liked);
    if (!user?._id) navigate("/sign_in");
    else{
      setLiked(!Liked);
      if (!Liked) {
        dispatch({
          type: "LIKE_POST",
          data: { userId: user._id, postId: props._id },
        });
      } else {
        dispatch({
          type: "UNLIKE_POST",
          data: { userId: user._id, postId: props._id },
        });
      }
    } 
  };
  return (
    <Container>
      <div className='like_container'>
        <div
          className='like'
          onClick={handleClick}
        >
          {Liked ? (
            <AiFillHeart
              size='20px'
              color='red'
            />
          ) : (
            <IconHeartPlus size='20px' />
          )}
          &nbsp;
          <div className='num'>
            {props.likes.length > 10 ? "10+" : props.likes.length}
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
          </Link>{" "}
          &nbsp;
          <div className='num'>{props.comments.length}</div>
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
    .comment {
      text-align: center;
      display: flex;
      align-items: center;
    }
  }
`;
