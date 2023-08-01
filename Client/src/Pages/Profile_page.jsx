import { styled } from "styled-components";
import React from "react";
import Banner from "../Components/Profile/banner.jsx";
import Main_profile from "../Components/Profile/Main_profile.jsx";
const Profile_page = () => {
  return (
    <Container>
      <Banner />
      <Main_profile />
    </Container>
  );
};

export default Profile_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.3fr 2fr 0.3fr;
`;
