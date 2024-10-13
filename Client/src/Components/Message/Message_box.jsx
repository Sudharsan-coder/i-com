import {
  Avatar,
  Button,
  Indicator,
  Loader,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDistanceToNow } from "date-fns";

const Message_box = ({ receiver, fetchMessage, messageList, hasMore }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { user, onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  
  useEffect(()=>{
    dispatch({
      type: "JOIN_MESSAGE_ROOM",
      data: { senderId: user._id, receiverId: receiver._id },
    });
  },[])


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  const relativeTime = (createdAt) => {
    return createdAt
      ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
      : "unknown time";
  };

  // Function to send message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        senderId: user._id,
        receiverId: receiver._id,
        message: currentMessage,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: "SEND_MESSAGE_REQUEST", data: messageData });
      setCurrentMessage("");
    }
  };

  const { userName = "", isOnline, _id } = receiver || {};
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
          color="teal"
          withBorder
          processing
          disabled={!isOnline && !userIsOnline}
        >
          <Avatar src={receiver.profilePicUrl||null} radius="xl">
            {profilePicName}
          </Avatar>
        </Indicator>
        <Text size="xl">{receiver.userName}</Text>
      </Header>

      <Body id="scrollableDiv">
        {messageList.length===0? <NoData>
          <h1>Start your conversation</h1>
        </NoData>:
        
        <InfiniteScroll
          dataLength={messageList.length} // Total number of items
          next={() => {
            console.log("Fetching more messages...");
            fetchMessage();
          }}
          inverse={true}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          loader={
            <Load>
              <Loader color="blue" />
            </Load>
          }
          className="message-container"
        >
          {messageList.map((data, index) => (
            <div
              className="message"
              id={user._id === data.senderId ? "you" : "other"}
              key={index}
            >
              <div>
                <div className="message-content">
                  <p>{data.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{relativeTime(data.createdAt)}</p>
                  <p id="author">
                    {user._id === data.senderId
                      ? user.userName
                      : receiver.userName}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div ref={scrollRef}></div>
        </InfiniteScroll>
        }
      </Body>

      <Footer>
        <Textarea
          className="textBox"
          placeholder="Enter Your Message"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <Button radius="lg" onClick={sendMessage}>
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
  height: 100%;
`;

const Header = styled.div`
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
  height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  p {
    all: unset;
  }
  .message-container {
    padding-right: 10px;
  }

  .message {
    display: flex;
    margin: 2%;
    margin-bottom: 10px;
  }

  .message-content {
    background-color: var(--primary_color);
    color: white;
    border-radius: 5px;
    padding: 10px;
    word-break: break-word;
    max-width: 100%;
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

const Load = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  h1 {
    font-size: 2rem;
    color: #b8b9ba;
  }
`;
