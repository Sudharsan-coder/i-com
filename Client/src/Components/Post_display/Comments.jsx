import { styled } from "styled-components";
import Single_comment from "./Single_comment";
const Comments = () => {
  return (
    <Container>
      <div className="head" id="comment">Commands</div>
      <div className="comment">
        <img src="" alt="me" />
        <textarea placeholder="Add to the discussion"/>
      </div>
      <Single_comment/>
    </Container>
  );
};

export default Comments;

const Container = styled.div`
    .head{
        font-size: 1.5em;
        font-weight: bold;
        margin:50px 0px ;
    }
    .comment{
        display: flex;
        justify-content: space-between;
        img{
            background: black;
            height: 45px;
            width: 50px;
            border-radius: 100%;
        }
        textarea{
            width: 90%;
            height: 100px;
        }
    }
`;
