import { Card, Container, Text, Title } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import PopularPostLoading from "./Loading/PopularPostLoading";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PopularPost = () => {
  const { isGettingPopularPosts, popularPosts } = useSelector(
    (state) => state.publicPosts
  );

  return (
    <Container
      size='responsive'
      mt={20}
    >
      <Card
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
      >
        <Header
          order={2}
          mb={10}
        >
          Popular Blogs
        </Header>

        {isGettingPopularPosts ? (
          <PopularPostLoading />
        ) : (
          popularPosts.map((data) => {
            return (
              <ContentTitle key={data._id}>
                <Link
                  to={`/post/${data._id}`}
                  style={{ all: "unset" }}
                >
                  <Text align='justify'>{data.title}</Text>
                </Link>
              </ContentTitle>
            );
          })
        )}
      </Card>
    </Container>
  );
};

export default PopularPost;

const Header = styled(Title)``;
const ContentTitle = styled.div`
  border-bottom: 1px solid gray;
  padding: 5%;
  margin-bottom: 10px;
  &:hover {
    box-shadow: 10px 5px 14px rgba(0, 102, 255, 0.07);
    cursor: pointer;
    color: var(--primary_color);
    background-color: white;
    border: 1px solid var(--primary_color) !important;
    border-radius: 5px;
  }
  &:last-child {
    border: none;
  }
`;
