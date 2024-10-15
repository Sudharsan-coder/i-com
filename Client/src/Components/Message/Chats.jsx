import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from '@mantine/core';
import styled from 'styled-components';
import Chats_user_card from './Chats_user_card';

const Chats = ({ fetchData,allUser,hasmore }) => {
  return (
    <div  >
          <InfiniteScroll
            dataLength={allUser.length}
            next={fetchData}
            hasMore={hasmore}
            scrollableTarget='scrollableDiv'
            loader={
              <Load>
                <Loader color='blue' />
              </Load>
            }
            className='infinity_scroll'
          >
            {allUser.map((data,index) => {
              return (
                <Chats_user_card
                  info={data}
                  key={index}
                />
              );
            })}
          </InfiniteScroll>
        
    </div>
  )
}

export default Chats

const Load = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
