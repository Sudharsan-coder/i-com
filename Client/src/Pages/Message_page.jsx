import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Main_chats from "../Components/Message/Main_chats";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message_box from "../Components/Message/Message_box";
import { resetChats, resetMessageList } from "../Redux/Slices/messageSlice";
import Message_page_description from "../Components/Message/Message_page_description";

const Message_page = () => {
  const dispatch = useDispatch();
  const { isAuth, user, isAuthenticating } = useSelector((state) => state.auth);
  const { totalPages, page, messageList, hasMore, chats } = useSelector(
    (state) => state.message
  );
  const { searchUsers } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const { receiverId } = useParams();
  const [receiver, setReceiver] = useState({
    _id: "",
    userName: "",
    profilePicUrl: "",
    isOnline: false,
  });

  useEffect(() => {
    if (!isAuthenticating) {
      if (!isAuth) navigate("/");
    }
    dispatch(resetChats());
  }, [isAuth, isAuthenticating]);

  useEffect(() => {
    if (chats.page === 1) fetchChats();
  }, [isAuth, chats.page]);

  useEffect(() => {
    dispatch(resetMessageList());
    const chatsInfo =
      chats.data.find((data) => data.userDetails?._id === receiverId) ||
      searchUsers.find((data) => data._id === receiverId);
    if (chatsInfo) {
      setReceiver(
        chatsInfo.userDetails ? { ...chatsInfo.userDetails } : { ...chatsInfo }
      );
    }
  }, [receiverId]);

  useEffect(() => {
    if (page === 1) fetchMessage();
  }, [receiverId, page]);

  const fetchChats = () => {
    dispatch({ type: "GET_CHATS" });
  };

  const fetchMessage = () => {
    dispatch({
      type: "GET_MESSAGE",
      data: {
        page,
        totalPages,
        roomId: [user._id, receiverId].sort().join("_"),
      },
    });
  };
  return (
    <Container>
      <WrapperContainer>
        <Left>
          <Main_chats fetchData={fetchChats} />
        </Left>
        <Right>
          {receiver.userName.length !== 0 ? (
            <Message_box
              receiver={receiver}
              fetchMessage={fetchMessage}
              messageList={messageList}
              hasMore={hasMore}
            />
          ) : (
            <Message_page_description />
          )}
        </Right>
      </WrapperContainer>
    </Container>
  );
};

export default Message_page;

const Container = styled.div`
  margin: 9vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const WrapperContainer = styled.div`
  display: flex;
  background-color: white;
  border: 0.0625rem solid #dee2e6;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem,
    rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem;
  height: 80%;
  width: 70%;
  border-radius: 0.5rem;
`;

const Left = styled.div`
  border-right: 1px solid #dee2e6;
  width: 40%;
  padding: 1.25rem;
  box-sizing: border-box;
`;
const Right = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 1.25rem;
  box-sizing: border-box;
`;

