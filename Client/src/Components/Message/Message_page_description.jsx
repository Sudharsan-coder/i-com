import React from "react";
import styled from "styled-components";
import Logo from "../Logo";
import { Title } from "@mantine/core";
import { IoLockClosedOutline } from "react-icons/io5";

const Message_page_description = () => {
  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Footer>
        <Icon>
          <IoLockClosedOutline
            size={30}
            color='gray'
          />{" "}
        </Icon>
        <Title color='dimmed'> End-to-end encrypted</Title>
      </Footer>
    </Container>
  );
};

export default Message_page_description;

const Container = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  font-size: 45px;
  .title {
    font-size: 28px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.div``;
