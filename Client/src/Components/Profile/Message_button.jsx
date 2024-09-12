import { Button, Drawer } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import Message_box from "./Message_box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Message_button = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Container>
      <Drawer
        opened={openDrawer}
        onClose={closeDrawer}
        title='Message'
        position='right'
      >
        <Message_box {...props} />
      </Drawer>
      <Button
        color='indigo'
        onClick={() => {
          if (!isAuth) navigate("/sign_in");
          else setOpenDrawer(true);
        }}
      >
        Message
      </Button>
    </Container>
  );
};

export default Message_button;

const Container = styled.div``;
