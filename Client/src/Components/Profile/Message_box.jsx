import { Avatar, Button, Indicator, Text, Textarea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom";
import { formatDistanceToNow } from "date-fns";

const Message_box = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { user, onlineUsers } = useSelector((state) => state.auth);
  const { messageList } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "JOIN_MESSAGE_ROOM",
      data: { senderId: user._id, receiverId: props._id },
    });
    dispatch({type:"GET_MESSAGE",data:[user._id,props._id].sort().join("_")})
  }, []);

  const relativeTime =(createdAt)=>{

    return (createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "unknown time")
  } 

  const sendMessage = async (e) => {
    if (currentMessage !== "") {
      const messageData = {
        senderId: user._id,
        receiverId: props._id,
        message: currentMessage,
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: "SEND_MESSAGE_REQUEST", data: messageData });
      setCurrentMessage("");
    }
  };
  const { userName = "", isOnline, _id } = props || {};
  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();
  const userIsOnline = onlineUsers.find((data) => data === _id);
  return (
    <Container>
      <Header>
        <Indicator
          size={5}
          color='teal'
          withBorder
          processing
          disabled={!isOnline && !userIsOnline}
        >
          <Avatar
            src={props.profilePicUrl}
            radius='xl'
          >
            {profilePicName}
          </Avatar>
        </Indicator>
        <Text size={"xl"}>{props.userName}</Text>
      </Header>
      <Body className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((data, index) => {
            return (
              <div
                className='message'
                id={user._id === data.senderId ? "you" : "other"}
                key={index}
              >
                <div>
                  <div className='message-content'>
                    <p>{data.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{relativeTime(data.createdAt)}</p>  
                    <p id='author'>
                      {user._id === data.senderId
                        ? user.userName
                        : props.userName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </Body>
      <Footer>
        <Textarea
          className='textBox'
          placeholder='Enter Your Message'
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <Button
          radius={"lg"}
          onClick={sendMessage}
        >
          <IoSend size={20} />
        </Button>
      </Footer>
    </Container>
  );
};

export default Message_box;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 9vh);
`;

const Header = styled.div`
  /* border: 1px solid black; */
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  background-color: var(--primary_color);
  color: white;
`;
const Body = styled.div`
  flex: 1;
  /* border: 1px solid black; */
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  p {
    all: unset;
  }
  .message-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    padding-right: 10px; /* Avoid cutting off messages */
  }

  .message {
    display: flex;
    margin: 5%;
    margin-bottom: 10px;
  }

  .message-content {
    background-color: var(--primary_color);
    color: white;
    border-radius: 5px;
    padding: 10px;
    word-break: break-word;
    max-width: 100%; /* Ensure message box fits within the container */
  }

  .message-meta {
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
  }

  #you {
    justify-content: flex-end;
    align-items: flex-end;
    align-self: flex-end;
  }

  #you .message-content {
    background-color: #01b0b0;
  }

  #you .message-meta {
    justify-content: flex-end;
  }

  #other {
    justify-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
  }

  #other .message-content {
    background-color: var(--primary_color);
    color: white;
  }

  #other .message-meta {
    justify-content: flex-start;
  }

  .message-meta #author {
    font-weight: bold;
    margin-left: 10px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .textBox {
    flex: 1;
  }
`;
