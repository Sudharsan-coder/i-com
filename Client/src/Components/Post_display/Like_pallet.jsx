import React from "react";
import Likes from "../Post/Likes.jsx";
import { styled } from "styled-components";
const Like_pallet = () => {
  return (
    <Container>
      <Likes />
    </Container>
  );
};

export default Like_pallet;

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 90px;
  .like_container {
    margin-top: 35px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .like {
      display: flex;
      flex-direction: column;
    }
  }
`;
