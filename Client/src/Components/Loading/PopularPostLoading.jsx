import { Skeleton } from "@mantine/core";
import React from "react";
import styled from "styled-components";

const PopularPostLoading = () => {
  const temp = new Array(5).fill(null);

  return (
    <Container>
      {temp.map((_, index) => {
        return (
          <Load key={index}>
            <Skeleton
              height={8}
              radius='xl'
            />
            <Skeleton
              height={8}
              mt={6}
              radius='xl'
            />
            <Skeleton
              height={8}
              mt={6}
              width='70%'
              radius='xl'
            />
          </Load>
        );
      })}
    </Container>
  );
};

export default PopularPostLoading;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Load = styled.div`
  border: 1px solid white;
  padding: 3%;
  border-radius: 10px;
`;
