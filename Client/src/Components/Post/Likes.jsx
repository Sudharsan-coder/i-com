import { styled } from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconHeartPlus } from "@tabler/icons-react";
import { useAuth } from "../../context/auth";

const Likes = (props) => {
  const auth = useAuth();
  const [Liked, setLiked] = useState(false);
  // console.log(props);
  
  return (
    <Container>
      <div className='like_container'>
        <div
          className='like'
          onClick={() => {
            setLiked(!Liked);
            console.log(Liked);
            if (!Liked) {
              if(auth.user.userName) {

                auth.post.posts.map((data) => {
                  if(data._id === props._id){
  
                    data.likes.push(auth.user._id);
                    console.log(data);
                  }
                })
              }
              axios
              .post(`https://icom-okob.onrender.com/post/like/${props._id}`,{},
                {
                  headers: {
                    token: `Bearer ${auth.user.accessToken}`,
                  },
                })
                .then(() => {
                  console.log("success");
                })
                .catch((err) => {
                  console.log(err);
                  if(err.response.status == 403)
                    {
                          auth.setShowModel(true);
                          auth.modelOC.open();
                    }
                });
            } else {
              auth.post.posts = auth.post.posts.map((data) => {
                if (data._id === props._id) {
                  data.likes = data.likes.filter((id) => id !== auth.user._id);
                  console.log(data);
                }
                return data;
              });
              axios
                .post(`https://icom-okob.onrender.com/post/unlike/${props._id}`,{},{
                  headers: {
                    token: `Bearer ${auth.user.accessToken}`,
                  },
                })
                .then(() => {
                  console.log("success");
                })
                .catch((err) => {
                  console.log(err);
                  if(err.response.status == 403)
                    {
                          auth.setShowModel(true);
                          auth.modelOC.open();
                    }
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
          )}&nbsp;
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
          </Link> &nbsp;
            <div className="num">
              {props.comments.length}
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
