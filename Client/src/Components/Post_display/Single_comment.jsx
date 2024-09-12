import { styled } from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const Single_comment = (props) => { 
  const relativeTime = props.createdAt ? formatDistanceToNow(new Date(props.createdAt), { addSuffix: true }) : "unknown time";
  return (
    <Container>
      <div className="frame">
        <Link to="/profile">
          <img src={props.user.profilePicUrl} alt="pic" />
        </Link>
        <div className="frame_content">
          <div className="title">
            <div className="user_name">{props.userName}</div>
            <div className="date">{relativeTime}</div>
          </div>
          <div className="body">
            {props.text}
          </div>
        </div>
      </div>
      {/* <div className="likes">
        <Like />
      </div> */}
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
      width: 100%;
      border-radius: 5px;
      margin-left: 15px;
      padding: 10px;
      box-sizing: border-box;
    }
    .date {
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
  .likes {
    margin: 20px 70px;
  }
`;
