import { Loader } from '@mantine/core';
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Single_user_card from './Single_user_card';

const Main_user = ({allUser,fetchData,hasmore}) => {
  return (
    <Container>
      <InfiniteScroll
        dataLength={allUser.length}
        next={fetchData}
        hasMore={hasmore}
        loader={<Load ><Loader color="blue"/></Load>}
        className='infinity_scroll'
      >
        {allUser.map((user) => {
          return (
            <Single_user_card
              data={user}
              key={user._id}
            />
          );
        })}
      </InfiniteScroll>
    </Container>
  )
}

export default Main_user

const Container = styled.div`
  grid-column: 2;
  box-sizing: border-box;
  gap: 20px;
  margin-bottom: 20px;
  .infinity_scroll{
    padding: 3%;
  }
`;

const Load = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`