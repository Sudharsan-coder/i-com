import React from "react";
import { styled } from "styled-components";
import Profile_pic from "./Profile_pic.jsx";
import Buttons from "./Buttons.jsx";
import Detail from "./Detail.jsx";

const Main_profile = () => {
  return (
    <Conatiner>
      <Profile_pic />
      <Buttons />
      <Detail />
    </Conatiner>
  );
};

export default Main_profile;

const Conatiner = styled.div`
  background: white;
  grid-column: 2;
  height: 100vh;
  z-index: 2;
  margin-top: 10vh;
  border-radius: 10px;
`;
