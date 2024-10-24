import { Avatar, Badge, Box, Indicator, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Chats_user_card = ({ info }) => {
  const { onlineUsers } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleRightClick = (e) => {
    e.preventDefault();
  };
  const {
    _id,
    userName = "",
    isOnline,
    profilePicUrl = null,
  } = info.userDetails || info || {};
  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();
  const userIsOnline = onlineUsers.find((info) => info === _id);

  const cardOnClickHandler = () => {
    navigate(`/message/${_id}`);
  };

  return (
    <>
      <Boxs
        bg={"white"}
        onClick={cardOnClickHandler}
      >
        <Wrap>
          <Indicator
            size={10}
            withBorder
            processing
            disabled={!isOnline && !userIsOnline}
          >
            <Avatar
              color='blue'
              onContextMenu={handleRightClick}
              src={profilePicUrl}
              alt="it's"
              size={"lg"}
            >
              {profilePicName}
            </Avatar>
          </Indicator>
          <Right>
            <Username>{userName}</Username>
            <Box w={100}>
              <Text truncate='end'>{info.message}</Text>
            </Box>
          </Right>
          <UnseenIndicator>
            {info.unSeen > 0 && (
              <Badge
                size='sm'
                variant='filled'
              >
                {info.unSeen}
              </Badge>
            )}
          </UnseenIndicator>
        </Wrap>
      </Boxs>
    </>
  );
};

export default Chats_user_card;

const Boxs = styled(Box)`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 0.0625rem solid #dee2e6;
  padding: 0.5rem;
  overflow: hidden;
  &:hover {
    background-color: #dee2e6;
    cursor: pointer;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  align-items: center;
`;
const Username = styled(Text)`
  font-size: 20px;
  font-weight: 800;
`;
const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UnseenIndicator = styled.div``;
