import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Avatar, Indicator, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Pop_over_user_detail from "./Pop_over_user_detail";
import { useSelector } from "react-redux";

const UserDetail = ({ user, createdAt }) => {
  const navigate = useNavigate();
  const [opened, { close, open }] = useDisclosure(false);
  const { onlineUsers } = useSelector((state) => state.auth);

  // Ensure createdAt is valid
  const relativeTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "unknown time";

  // Ensure user object is valid
  const { userName = "", profilePicUrl, _id, isOnline } = user || {};

  const handleProfileClick = () => {
    if (_id) {
      navigate(`/profile/${_id}`);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();
  const userIsOnline = onlineUsers.find((data) => data === _id);
  return (
    <Container>
      <div className='frame'>
        <Indicator
          size={7}
          withBorder
          processing
          disabled={!isOnline && !userIsOnline}
        >
          <Avatar
          color="blue"
            onContextMenu={handleRightClick}
            src={profilePicUrl}
            alt={`${userName}'s profile`}
            onClick={handleProfileClick}
            radius='xl'
          >
            {profilePicName}
          </Avatar>
        </Indicator>
        <div className='frame_content'>
          <Popover
            width={250}
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
            <Popover.Dropdown style={{ pointerEvents: "none" }}>
              <Pop_over_user_detail user={user} />
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
