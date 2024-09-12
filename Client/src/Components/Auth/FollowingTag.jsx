import React from "react";
import { Carousel } from "@mantine/carousel";
import styled from "styled-components";
import { Badge } from "@mantine/core";
const FollowingTag = () => {
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
      <Carousel
        slideSize='1%'
        slideGap='xl'
        dragFree
        withControls={false}
        className='carousel'
        align='start'
      >
        {tag.map((data, index) => {
          return (
            <Carousel.Slide key={index}>
              <Badge
                component='a'
                size='xl'
              >
                {data} +
              </Badge>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default FollowingTag;

const Container = styled.div`
  padding: 20px;
  grid-column: 2;
  .carousel {
    cursor: grabbing;
  }
  .mantine-Badge-root {
    border: 1px solid black;
    color: black;
    background-color: white;
    &:hover {
      cursor: pointer;
      background-color: #adabab;
      color: white;
      border: none;
    }
  }
  overflow: hidden;
`;
