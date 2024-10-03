import React from "react";
import styled from "styled-components";
import Your_activity_menus from "../Components/YourActivity/Your_activity_menus";
import Your_activity_post from "../Components/YourActivity/Your_activity_post";

const Your_activity = () => {
  return (
    <Container>
      <MiddleColumn>
        <Your_activity_menus />
        <Your_activity_post />
      </MiddleColumn>
    </Container>
  );
};

export default Your_activity;

const Container = styled.div`
  margin-top: 15vh;
  display: grid;
  grid-template-columns: 0.7fr 2fr 0.8fr;
`;
const MiddleColumn = styled.div`
  grid-column: 2;
  display: grid;
  grid-template-columns: 0.7fr 2fr;
  column-gap: 20px;
`;
