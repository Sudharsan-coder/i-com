import { Avatar, Box, Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Single_user_card = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Boxs bg={"white"}>
        <Wrap>
          <Avatar
            src={props.data.profilePicUrl}
            alt="it's"
            size={"lg"}
          />
          <Username
            order={1}
            onClick={() => navigate(`/profile/${props.data._id}`)}
          >
            {props.data.userName}
          </Username>
        </Wrap>
      </Boxs>
    </Container>
  );
};

export default Single_user_card;

const Container = styled.div`
  margin-top: 1rem;
  box-shadow: 10px 5px 14px rgba(0, 0, 0, 0.07);
`;
const Wrap = styled.div`
  display: flex;
  gap: 40px;
  /* align-items: center; */
`;
const Boxs = styled(Box)`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  text-transform: capitalize;
`;
const Username = styled(Title)`
  &:hover {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;
