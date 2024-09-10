import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sign_in_img from "../assets/sign_in.jpeg";
import { Input, LoadingOverlay, PasswordInput } from "@mantine/core";
import { IconLock, IconUserCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Sign_in = () => {
  const [log, setLog] = useState({ emailid: "", password: "" });
  const { isSigningIn, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SIGN_IN", data: log });
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
            visible={isSigningIn}
            overlayBlur={2}
          />
          <Heading>
            <span className='title'>Sign in</span>
          </Heading>
          <Input.Wrapper
            label='Email ID'
            withAsterisk
          >
            <Input
              icon={<IconUserCircle />}
              placeholder='Your Email ID'
              radius='md'
              value={log.emailid}
              onChange={(e) => {
                setLog({ ...log, emailid: e.target.value });
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
              value={log.password}
              onChange={(e) => {
                setLog({ ...log, password: e.target.value });
              }}
            />
          </Input.Wrapper>
          <LoginBtn type='submit'>Login</LoginBtn>
          <div>
            <ForgetPassword>Forget Password?</ForgetPassword>
            <Signup>
              If you don't have a account{" "}
              <Link to={"/sign_up"}>Create it.</Link>
            </Signup>
          </div>
        </WrapContainer>
      </Left>
      <Right />
    </Container>
  );
};

export default Sign_in;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
const LoginBtn = styled.button`
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
const ForgetPassword = styled.p``;
const Signup = styled.p``;
const Right = styled.div`
  flex: 1;
  background: lightblue url(${sign_in_img}) no-repeat center center/cover;
`;
