import { Button, Card, Text, Title } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import PopularTagsLoading from "../Loading/PopularTagsLoading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopRecentTag = () => {
  const { isGettingPopularTags, popularTags } = useSelector(
    (state) => state.publicPosts
  );
  const navigate = useNavigate();
  const tagClickHandler=(tagValue)=>{
    navigate(`/search?tag=${tagValue}`);
  }
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
        <Title order={3}>Popular Hash Tags</Title>

        {isGettingPopularTags ? (
          <PopularTagsLoading />
        ) : (
          <Text
            size='sm'
            style={{
              color: "gray",
              marginBottom: 10,
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            {popularTags.map((data, index) => {
              return (
                <Button
                  key={index}
                  m={10}
                  variant='light'
                  onClick={()=>tagClickHandler(data._id)}
                >
                  #{data._id}
                </Button>
              );
            })}
          </Text>
        )}
      </Card>
    </Container>
  );
};

export default TopRecentTag;

const Container = styled.div``;
