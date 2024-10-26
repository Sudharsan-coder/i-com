import { Button, Drawer, ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import Message_box from "../Message/Message_box";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Message_button = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const { totalPages, page, messageList,hasMore } = useSelector(
    (state) => state.message
  );
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const fetchMessage = () => {
    dispatch({
      type: "GET_MESSAGE",
      data: {
        page,
        totalPages,
        roomId: [user._id, props._id].sort().join("_"),
      },
    });
  };

  const messageButtonClickHandler = () => {
    if (!isAuth) navigate("/sign_in");
    else {
      setOpenDrawer(true);
      fetchMessage()
    }
  };

  return (
    <Container>
      <Drawer
        opened={openDrawer}
        onClose={closeDrawer}
        // title='Message'
        withCloseButton={false}
        position='right'
      >
      <div style={{height:"96vh"}}>
        <Message_box receiver={props} fetchMessage={fetchMessage} messageList={messageList} hasMore={hasMore}  />
      </div>
      </Drawer>
      <Button
        color='indigo'
        onClick={messageButtonClickHandler}
      >
        Message
      </Button>
    </Container>
  );
};

export default Message_button;

const Container = styled.div``;
