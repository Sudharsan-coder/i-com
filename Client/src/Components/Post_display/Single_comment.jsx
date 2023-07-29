import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Like from "../Likes.jsx";
import im1 from '../../assets/logo.png'

const Single_comment = () => {
  return (
    <Container>
      <div className="frame">
        <Link to="/profile">
          <img src={im1} alt="pic" />
        </Link>
        <div className="frame_content">
          <div className="title">
            <div className="user_name">Sudharsan</div>
            <div className="date">Posted on 22 Jan</div>
          </div>
          <div className="body">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum,
            sapiente illo. Rerum, eveniet hic. Quisquam atque doloribus velit
            eveniet nisi.
          </div>
        </div>
      </div>
      <div className="likes">
      <Like /></div>
    </Container>
  );
};

export default Single_comment;

const Container = styled.div`
  margin-top: 30px;
  .frame {
    display: flex;
    align-items: center;
    img {
      height: 45px;
      width: 50px;
      border-radius: 100%;
      background-color: black;
    }
    .frame_content {
      border: 2px solid rgb(178, 178, 178);
      margin-left: 15px;
      padding: 10px;
      box-sizing: border-box;
    }
    .date {
      margin-left: 20px;
      color: rgb(113, 113, 113);
      font-size: 0.8em;
    }
    .title {
      display: flex;
      align-items: center;
      height: fit-content;
      margin-bottom: 10px;
    }
  }
  .likes{
    margin:20px 70px;
  }
`;
