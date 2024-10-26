import { Title } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import Search_box from "./Search_box";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import UserCardLoading from "../Loading/UserCardLoading";

const Main_chats = ({ fetchData }) => {
  const { chats, isGettingChats } = useSelector((state) => state.message);
  return (
    <Container>
      <Header>
        <Title>CHATS</Title>
        <Search_box />
      </Header>
      <Body id='scrollableDiv'>
        {isGettingChats ? (
          <UserCardLoading />
        ) : chats.data.length !== 0 ? (
          <Chats
            fetchData={fetchData}
            allUser={chats.data}
            hasmore={chats.hasMore}
          />
        ) : (
          <h1>No Chats</h1>
        )}
      </Body>
    </Container>
  );
};

export default Main_chats;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;
const Header = styled.div`
  padding: 2%;
`;
const Body = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;
