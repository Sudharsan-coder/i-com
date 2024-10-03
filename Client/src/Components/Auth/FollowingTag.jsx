import React from "react";
import { Carousel } from "@mantine/carousel";
import styled from "styled-components";
import { Badge } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
const FollowingTag = () => {
  const {user} = useSelector((state)=>state.auth)
  const tag = user.followingHashTags||[];
  const navigate = useNavigate();
  const tagClickHandler=(tagValue)=>{
    navigate(`/search?tag=${tagValue}`);
  }
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
                onClick={()=>tagClickHandler(data)}
                size='xl'
                style={{boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.07)"}}
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
  .carousel {
    cursor: grabbing;
  }
  .mantine-Badge-root {
    background-color: white;
    border: 1px solid var(--primary_color);
    &:hover {
      cursor: pointer;
      background-color: var(--primary_color);
      color: white;
    }
  }
  overflow: hidden;
`;
