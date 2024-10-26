import React from "react";
import { Card, Avatar, Title, Text, Indicator } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Buttons from "./Buttons";

const ProfileCard = ({ userDetail }) => {
  const navigate = useNavigate();
  // console.log(userDetail);
  const handleRightClick = (e) => {
    e.preventDefault();
  };

  const { user, onlineUsers } = useSelector((state) => state.auth);
  const { userName = "", isOnline, _id } = userDetail || {};
  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();
  const userIsOnline = onlineUsers.find((data) => data === _id);
  return (
    <Container>
      <Card
        shadow='sm'
        display={"flex"}
        withBorder
        style={{
          minWidth: 300,
          margin: "30px",
          marginTop: 40,
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 15,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Indicator
            size={10}
            withBorder
            processing
            disabled={!isOnline && !userIsOnline}
          >
            <Avatar
              color='blue'
              onContextMenu={handleRightClick}
              size={100}
              radius='xl'
              src={userDetail.profilePicUrl}
            >
              {profilePicName}
            </Avatar>
          </Indicator>
        </div>

        <Title
          order={3}
          style={{ marginBottom: 5 }}
        >
          {userDetail.userName
            ? userDetail.firstName + " " + userDetail.lastName
            : ""}
        </Title>
        <Text
          size='sm'
          style={{ color: "gray", marginBottom: 10 }}
        >
          {userDetail.userName ? `@${userDetail.userName}` : ""}
        </Text>
        <Text
          size='sm'
          style={{ color: "gray", marginBottom: 10 }}
        >
          {userDetail.userBio ? `${userDetail.userBio}` : ""}
        </Text>
        {user._id !== userDetail._id && (
          <FollowButton>
            <Buttons {...userDetail} />
          </FollowButton>
        )}
      </Card>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div``;

const FollowButton = styled.div`
  display: flex;
  justify-content: center;
`;
