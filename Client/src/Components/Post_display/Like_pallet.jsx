import React from "react";
import Likes from "../Post/Likes.jsx";
import { styled } from "styled-components";
const Like_pallet = (props) => {
  return (
    <Container>
      <Likes {...props}/>
    </Container>
  );
};

export default Like_pallet;

const Container = styled.div`
  position: fixed;
  height: 100%;
  
  .like_container {
    margin-top: 35px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .like {
      flex-direction: column;
    }
    .comment{
    flex-direction: column;
    }
  }
`;
