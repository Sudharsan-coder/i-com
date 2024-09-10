import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sign_up_img from "../assets/sign_up.webp";
import { Input, LoadingOverlay, PasswordInput } from "@mantine/core";
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Sign_up = () => {
  const [reg, setreg] = useState({
    first: "",
    last: "",
    emailid: "",
    username: "",
    password: "",
  });
  const { isSigningUp, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/sign_in");
  }, [isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SIGN_UP", data: reg });
  };
  return (
    <Container>
      <Left>
        <Heading>
          <span className='welcome'>
            Welcome to <span>iCom!</span>
          </span>
        </Heading>
        <WrapContainer onSubmit={handleSubmit}>
          <LoadingOverlay
            visible={isSigningUp}
            overlayBlur={2}
          />
          <Heading>
            <span className='title'>Sign up</span>
          </Heading>
          <Name>
            <Input.Wrapper
              label='First Name'
              withAsterisk
            >
              <Input
                placeholder='Your First Name'
                radius='md'
                value={reg.first}
                onChange={(e) => {
                  setreg({ ...reg, first: e.target.value });
                }}
              />
            </Input.Wrapper>
            <Input.Wrapper
              label='Last Name'
              withAsterisk
            >
              <Input
                placeholder='Your Last Name'
                radius='md'
                value={reg.last}
                onChange={(e) => {
                  setreg({ ...reg, last: e.target.value });
                }}
              />
            </Input.Wrapper>
          </Name>
          <Input.Wrapper
            label='UserName'
            withAsterisk
          >
            <Input
              icon={<IconUserCircle />}
              placeholder='Your UserName'
              radius='md'
              value={reg.username}
              onChange={(e) => {
                setreg({ ...reg, username: e.target.value });
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label='Email ID'
            withAsterisk
          >
            <Input
              icon={<IconAt />}
              placeholder='Your email'
              radius='md'
              value={reg.emailid}
              onChange={(e) => {
                setreg({ ...reg, emailid: e.target.value });
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label='Password'
            withAsterisk
          >
            <PasswordInput
              placeholder='Your password'
              icon={<IconLock size='1rem' />}
              value={reg.password}
              onChange={(e) => {
                setreg({ ...reg, password: e.target.value });
              }}
            />
          </Input.Wrapper>
          <RegisterBtn type='submit'>Register</RegisterBtn>
        </WrapContainer>
      </Left>
      <Right />
    </Container>
  );
};

export default Sign_up;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const WrapContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 3rem 7rem;
  margin: 3rem 9rem;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
const Heading = styled.div`
  text-align: center;
  .welcome {
      font-size: 25px;
      span {
          font-size: 45px;
        
      color: var(--primary_color);
    }
  }
  .title {
    font-size: 28px;
  }
`;
const RegisterBtn = styled.button`
  padding: 0.6rem;
  color: white;
  background-color: var(--primary_color);
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const Right = styled.div`
  flex: 1;
  background: lightblue url(${sign_up_img}) no-repeat center center/cover;
`;

const Name = styled.div`
  display: flex;
  gap: 20px;
`;
