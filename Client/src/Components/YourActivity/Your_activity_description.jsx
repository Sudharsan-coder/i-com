import { Card, Text } from "@mantine/core";
import React from "react";
import styled from "styled-components";

const Your_activity_description = () => {
  return (
    <Container
      withBorder
      shadow='sm'
    >
      <WrapperContainer>
        <Title align='center'>Your Digital Footprint</Title>
        <Description>
          Every like, every save, and every comment tells a story. Your Activity
          is a timeline of your interactions, a reflection of what captured your
          attention.
        </Description>
        <Description>Dive in and rediscover:</Description>
        <List>
          <li>Posts that made you think or laugh.</li>
          <li>Inspiration you've bookmarked for later.</li>
          <li>Your recent conversations and thoughts.</li>
        </List>
        <Description>
          Your journey through the content isn't just about what you’ve seen;
          it’s about what you felt, shared, and saved. Reconnect with your
          favorite moments.
        </Description>
      </WrapperContainer>
    </Container>
  );
};

export default Your_activity_description;

const Container = styled(Card)`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
`;

const WrapperContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled(Text)`
  font-size: 18px;
  color: #7f8c8d;
  margin-bottom: 15px;
`;

const List = styled.ul`
  text-align: left;
  margin: 0 auto;
  padding-left: 20px;
  max-width: 400px;
  li {
    font-size: 16px;
    margin-bottom: 10px;
    color: #34495e;
  }
`;
