import React from "react"; // Make sure to import React
import { styled } from "styled-components";
import Single_comment from "./Single_comment";

const Comments = (props) => {
  const commentArray = props.comments;
  console.log(commentArray);
  return (
    <Container>
      <div className="head" id="comment">
        Commands
      </div>
      <div className="comment">
        <img src="" alt="me" />
        <textarea placeholder="Add to the discussion" />
      </div>
      {/* Use parentheses to wrap the map function body */}
      {commentArray.map((data) => (
        <Single_comment key={data._id} {...data} />
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
  .comment {
    display: flex;
    justify-content: space-between;
    img {
      background: black;
      height: 45px;
      width: 50px;
      border-radius: 100%;
    }
    textarea {
      width: 90%;
      height: 100px;
    }
  }
`;
