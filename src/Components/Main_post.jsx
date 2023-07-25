import React from 'react'
import { styled } from 'styled-components';

const Main_post = () => {
  return (
    <Container>
        <Block>
        Main_post
        </Block>
    </Container>
  )
}
export default Main_post;

const Block=styled.div`
    background:black;
    grid-row:1;
    height:70vh;
    width:100%;
    border-radius:10px;

`
const Container=styled.div`
    grid-column:2;
    height:90vh;
    padding:3%;
    box-size:border-box;
    background:rgb(245, 245, 245);
    `