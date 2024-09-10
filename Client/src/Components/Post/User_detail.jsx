import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import React from "react";

const UserDetail = ({ user, createdAt }) => {
  const navigate = useNavigate();
  
  // Ensure createdAt is valid
  const relativeTime = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : "unknown time";

  // Ensure user object is valid
  const { userName, profilePicUrl,_id } = user || {};

  const handleProfileClick = () => {
    if (_id) {
      navigate(`/profile/${_id}`);
    }
  };

  return (
    <Container>
      <div className="frame">
        <img
          src={profilePicUrl || "/path/to/default-image.jpg"} // Fallback image
          alt={`${userName}'s profile`}
          onClick={handleProfileClick}
        />
        <div className="frame_content">
          <div className="user_name" onClick={handleProfileClick}>
            {userName || "Unknown User"}
          </div>
          <div className="date">{relativeTime}</div>
        </div>
      </div>
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  .frame {
    display: flex;
    align-items: center;

    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      cursor: pointer;
    }

    .frame_content {
      margin-left: 15px;
    }

    .user_name {
      font-size: 1em;
      cursor: pointer;
      display: inline-block;
      &:hover {
        background-color: #f6f6f6;
        transition: background-color 0.3s ease-in-out;
      }
    }

    .date {
      color: rgb(113, 113, 113);
      font-size: 0.9em;
    }
  }
`;
