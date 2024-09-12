import React from "react";
import { Card, Avatar, Title, Text } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Buttons from "./Buttons";

const ProfileCard = ({ userDetail }) => {
  const navigate = useNavigate();
  // console.log(userDetail);
  
const {user} = useSelector((state)=>state.auth);
  return (
    <Container>
      <Card
        shadow='sm'
        display={"flex"}
        style={{
          minWidth: 300,
          margin: "30px",
          marginTop: 40,
          textAlign: "center",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
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
          <Avatar
            size={80}
            radius='xl'
            src={userDetail.profilePicUrl}
            alt={"pradeep"}
          />
        </div>

        <Title
          order={3}
          style={{ marginBottom: 5 }}
        >
          {userDetail.userName ? userDetail.firstName + " " + userDetail.lastName : ""}
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
        {(user._id!==userDetail._id)&&<FollowButton>
          <Buttons {...userDetail} />
        </FollowButton>}
      </Card>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div`
  grid-column: 3;
`;

const FollowButton = styled.div`
  display: flex;
  justify-content: center;
`;
