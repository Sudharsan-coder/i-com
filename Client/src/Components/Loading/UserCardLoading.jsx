import { Skeleton } from "@mantine/core";
import React from "react";
import styled from "styled-components";

const UserCardLoading = () => {
  const temp = new Array(5).fill(null);

  return (
    <Container>
      {temp.map((_, index) => {
        return (
          <Load key={index}>
            <Header>
              <Skeleton
                height={50}
                circle
                mb='xl'
              />
            </Header>
            <Body>
              <Skeleton
                height={8}
                radius='xl'
              />
              <Skeleton
                height={8}
                mt={6}
                width='50%'
                radius='xl'
              />
              <Skeleton
                height={8}
                mt={6}
                width='30%'
                radius='xl'
              />
            </Body>
          </Load>
        );
      })}
    </Container>
  );
};

export default UserCardLoading;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Load = styled.div`
    height: 20%;
  display: flex;
  justify-content: center;
  gap: 2%;
  border: 1px solid white;
  padding: 3%;
  border-radius: 10px;
`;

const Body = styled.div`
flex: 1;
`;
const Header = styled.div`
`;
