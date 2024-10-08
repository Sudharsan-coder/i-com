import { Avatar, Box, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Single_user_card = (props) => {

  const navigate = useNavigate();
  const handleRightClick = (e) => {
    e.preventDefault();
  };  

  return (
    <Container>
      <Boxs bg={"white"}>
        <Wrap>
          <Avatar
            onContextMenu={handleRightClick}
            src={props.data.profilePicUrl}
            alt="it's"
            size={"lg"}
          >{props.data.userName[0]+props.data.userName[props.data.userName.length-1]}</Avatar>
          <Username
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
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: white;
  border: 0.0625rem solid #dee2e6;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem;
  padding: 0.5rem;
  `;
const Wrap = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  `;
const Boxs = styled(Box)`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  `;
const Username = styled(Text)`
    font-size: 20px ;
    font-weight: 800;
  &:hover {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;
