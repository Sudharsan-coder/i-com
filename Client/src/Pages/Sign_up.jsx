import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sign_up_img from "../assets/sign_up.webp";
import { Input, LoadingOverlay, PasswordInput } from "@mantine/core";
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCheckUserNameMessage } from "../Redux/Slices/authSlice";
const Sign_up = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reg, setreg] = useState({
    first: "",
    last: "",
    emailid: "",
    username: "",
    password: "",
  });
  const [regError, setregError] = useState({
    first: "",
    last: "",
    emailid: "",
    password: "",
  });

  const { isSigningUp, isAuth, checkUserNameMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuth) navigate("/sign_in");
  }, [isAuth]);
  
  useEffect(()=>{
    dispatch(setCheckUserNameMessage(""))
  },[])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    const nameRegex = /^(?=.*[A-Z a-z])$/;
    return nameRegex.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Start with a blank regError object
    setregError({
      first: "",
      last: "",
      emailid: "",
      password: "",
    });

    // Using let since we'll update the errors directly in the state
    let hasError = false;

    if (reg.first.length === 0) {
      setregError((prev) => ({ ...prev, first: "First name is required" }));
      hasError = true;
    } else if (!validateName(reg.first)) {
      setregError((prev) => ({ ...prev, first: "Please use only alphabet" }));
      hasError = true;
    }

    if (reg.last.length === 0) {
      setregError((prev) => ({ ...prev, last: "Last name is required" }));
      hasError = true;
    } else if (!validateName(reg.last)) {
      setregError((prev) => ({ ...prev, last: "Please use only alphabet" }));
      hasError = true;
    }

    if (reg.username.length === 0) {
      dispatch(setCheckUserNameMessage("User name is required"));
      hasError = true;
    }

    if (reg.emailid.length === 0) {
      setregError((prev) => ({ ...prev, emailid: "Email is required" }));
      hasError = true;
    } else if (!validateEmail(reg.emailid)) {
      setregError((prev) => ({
        ...prev,
        emailid: "Please enter a valid email",
      }));
      hasError = true;
    }

    if (reg.password.length === 0) {
      setregError((prev) => ({ ...prev, password: "Password is required" }));
      hasError = true;
    } else if (!validatePassword(reg.password)) {
      setregError((prev) => ({
        ...prev,
        password:
          "Password must contain at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long.",
      }));
      hasError = true;
    }

    // If no errors, dispatch the signup action
    if (!hasError && checkUserNameMessage.length === 0) {
      dispatch({ type: "SIGN_UP", data: reg });
    }
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
              error={regError.first}
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
              error={regError.last}
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
            error={checkUserNameMessage}
          >
            <Input
              icon={<IconUserCircle />}
              placeholder='Your UserName'
              radius='md'
              value={reg.username}
              onChange={(e) => {
                setreg({ ...reg, username: e.target.value });
                setTimeout(() => {
                  dispatch({ type: "CHECK_USER_NAME", data: reg.username });
                }, 2000);
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label='Email ID'
            withAsterisk
            error={regError.emailid}
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
            error={regError.password}
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
