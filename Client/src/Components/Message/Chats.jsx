import { Loader, Title } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import Chats_user_card from "./Chats_user_card";
import UserCardLoading from "../Loading/UserCardLoading";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Search_box from "./Search_box";

const Chats = ({ fetchData }) => {
  const { chats, isGettingChats } = useSelector((state) => state.message);

  return (
    <Container>
      <Header>
        <Title>CHATS</Title>
        <Search_box/>
      </Header>
      <Body id='scrollableDiv'>
        {isGettingChats ? (
          <UserCardLoading />
        ) : chats.data.length !== 0 ? (
          <InfiniteScroll
            dataLength={chats.data.length}
            next={fetchData}
            hasMore={chats.hasmore}
            scrollableTarget='scrollableDiv'
            loader={
              <Load>
                <Loader color='blue' />
              </Load>
            }
            className='infinity_scroll'
          >
            {chats.data.map((data) => {
              return (
                <Chats_user_card
                  info={data}
                  key={data.userDetails._id}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          <h1>nothing</h1>
        )}
      </Body>
    </Container>
  );
};

export default Chats;

const Container = styled.div`
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
  overflow-y: auto;
`;

const Load = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
