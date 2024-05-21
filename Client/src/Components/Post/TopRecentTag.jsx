import { Button, Card, Text, Title } from "@mantine/core";
import React from "react";
import styled from "styled-components";

const TopRecentTag = () => {
  const tag = [
    "IOS",
    "React",
    "js",
    "ML",
    "AI",
    "Ruby",
    "Java",
    "Cprogramming",
    "Ruby",
    "MERN",
    "MARN",
    "Android",
    "visualStudio",
    "Swift",
    "SwiftUI",
    "BlockChain",
    "JQuery",
  ];
  return (
    <Container>
      <Card
        shadow='sm'
        style={{
          maxWidth: 350,
          margin: "auto",
          marginTop: 40,
          textAlign: "center",
          borderRadius: 10,
        }}
      >
        <Title order={3}>Top Hash Tag</Title>

        <Text
          size='sm'
          
          style={{ color: "gray", marginBottom: 10, marginTop: 20, justifyContent:"center"}}
        >
        {tag.map((data, index) => {
          return (
              <Button key={index} m={10}  variant='light'>#{data}</Button>
            );
          })}
          </Text>
      </Card>
    </Container>
  );
};

export default TopRecentTag;

const Container = styled.div`
  grid-column: 3;
`;
