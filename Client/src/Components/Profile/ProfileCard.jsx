import React from "react";
import { Card, Avatar, Title, Text, Button } from "@mantine/core";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const {isAuth,user} = useSelector((state)=>state.auth)
  const navigate = useNavigate();

  return (
    <Container>
      {isAuth? (
        <Card
          shadow='sm'
          style={{
            maxWidth: 250,
            margin: "auto",
            marginTop: 40,
            textAlign: "center",
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
              src={
                auth.user.profile
              }
              alt={"pradeep"}
            />
          </div>
          
          <Title
            order={3}
            orderMd={2}
            style={{ marginBottom: 5 }}
          >
            {user.userName ? user.firstName + " " + user.lastName : ""}
          </Title>
          <Text
            size='sm'
            style={{ color: "gray", marginBottom: 10 }}
          >
            {user.userName? (`@${user.userName}`) : ""}
          </Text>
          <Button
            variant='light'
            onClick={() => { user.userName ?
              navigate(`/profile/${user._id}`):navigate();
            }}
          >
            View full Profile
          </Button>
        </Card>
      ) : (
        <Card
          shadow='sm'
          style={{
            maxWidth: 250,
            margin: "auto",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <Title
            order={10}
            orderMd={2}
            style={{ marginBottom: 5 }}
          >
            Need to Login/signUp
          </Title>
        </Card>
      )}
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div`
  grid-column: 1;
`;
