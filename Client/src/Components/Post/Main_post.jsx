//containers all the posts
import { styled } from "styled-components";
import Single_post from "./Single_post.jsx";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";

const Main_post = ({allPost,fetchData,hasmore}) => {
  return (
    <Container>
      <InfiniteScroll
        dataLength={allPost.length}
        next={fetchData}
        hasMore={hasmore}
        loader={<Load ><Loader color="blue"/></Load>}
      >
        {allPost.map((post) => {
          return (
            <Single_post
              {...post}
              key={post._id}
            />
          );
        })}
      </InfiniteScroll>
    </Container>
  );
};
export default Main_post;

const Container = styled.div`
  grid-column: 2;
  height: 90vh;
  padding: 3%;
  box-sizing: border-box;
  gap: 20px;
  margin-bottom: 20px;
`;

const Load = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`