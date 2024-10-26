import { Avatar, Box, Indicator, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Single_user_card = (props) => {
  const { onlineUsers } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleRightClick = (e) => {
    e.preventDefault();
  };
  const { _id, userName = "", isOnline } = props.data || {};
  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();
  const userIsOnline = onlineUsers.find((data) => data === _id);
  return (
    <Container>
      <Boxs bg={"white"}>
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
              src={props.data.profilePicUrl}
              alt="it's"
              size={"lg"}
            >
              {profilePicName}
            </Avatar>
          </Indicator>
          <Box
            miw={200}
            maw={250}
          >
            <Username
              truncate='end'
              onClick={() => navigate(`/profile/${props.data._id}`)}
            >
              {userName}
            </Username>
          </Box>
        </Wrap>
      </Boxs>
    </Container>
  );
};

export default Single_user_card;

const Container = styled.div`
  margin-top: 1rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: white;
  border: 0.0625rem solid #dee2e6;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem,
    rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem;
  padding: 0.5rem;
`;
const Wrap = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Boxs = styled(Box)`
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;
const Username = styled(Text)`
  font-size: 20px;
  font-weight: 800;
  &:hover {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;
