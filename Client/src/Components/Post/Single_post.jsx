//has single post in the main_post
import { styled } from "styled-components";
import User_det from "./User_detail.jsx";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";
const Single_post = () => {
  const [Liked, setLiked] = useState(false);
  return (
    <Container>
      <Block>
        <User_det />
        <div className="heading">Introduction to Machine Learning basics</div>
        <Tag>
          <div className="tag">#suda</div>
        </Tag>
        <div className="icons">
          <div
            className="like"
            onClick={() => {
              setLiked(!Liked);
            }}
          >
            {Liked ? <FcLike size="20px" />  : <AiOutlineHeart size="20px" />}
            10
          </div>
          <div className="comment">
            <FaRegCommentDots size="20px" />
          </div>
        </div>
      </Block>
    </Container>
  );
};

export default Single_post;

const Container = styled.div`
  background: yellow;
  height: fit-content;
  border-radius: 15px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 2%;

  .heading {
    font-size: 1.8em;
    margin-left: 65px;
    padding: 15px 0px;
  }
  .icons {
    display: flex;
    justify-content: space-between;
    width: 90px;
    height: 20px;
    margin-left: 65px;
    .like {
      cursor: pointer;
    }
  }
`;

const Tag = styled.div`
  margin-left: 65px;
  margin-bottom: 15px;
  .tag{
    width: fit-content;
  }
`;
