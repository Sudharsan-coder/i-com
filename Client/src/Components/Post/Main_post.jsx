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
        className="scrollPost"
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
  box-sizing: border-box;
  gap: 20px;
  margin-bottom: 20px;
  .scrollPost{
    padding: 3%;
  }
`;

const Load = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`