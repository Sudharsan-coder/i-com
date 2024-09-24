import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const UserDetail = ({ user, createdAt }) => {
  const navigate = useNavigate();
  const [opened, { close, open }] = useDisclosure(false);

  // Ensure createdAt is valid
  const relativeTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "unknown time";

  // Ensure user object is valid
  const { userName, profilePicUrl, _id } = user || {};

  const handleProfileClick = () => {
    if (_id) {
      navigate(`/profile/${_id}`);
    }
  };

  return (
    <Container>
      <div className='frame'>
        <img
          src={profilePicUrl || "/path/to/default-image.jpg"} // Fallback image
          alt={`${userName}'s profile`}
          onClick={handleProfileClick}
        />
        <div className='frame_content'>
          <Popover
          width={350}
            position='bottom'
            withArrow
            shadow='md'
            opened={opened}
          >
            <Popover.Target>
              <div
                className='user_name'
                onClick={handleProfileClick}
                onMouseEnter={open}
                onMouseLeave={close}
              >
                {userName || "Unknown User"}
              </div>
            </Popover.Target>
            <Popover.Dropdown style={{ pointerEvents: "none" }} display={"none"}>
              
            </Popover.Dropdown>
          </Popover>

          <div className='date'>{relativeTime}</div>
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
