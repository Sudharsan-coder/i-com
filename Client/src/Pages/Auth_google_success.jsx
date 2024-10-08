import { Loader } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Auth_google_success = () => {
  const dispatch = useDispatch();
  const [token] = useSearchParams();
  const googleOAuthAccessToken = token.get("token");
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (googleOAuthAccessToken) {
      dispatch({
        type: "GOOGLE_AUTH",
        data: { token: googleOAuthAccessToken },
      });
    }
  }, [googleOAuthAccessToken]);

  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth]);
return (
    <Container>
      <div className='wrapper'>
        <video
          autoPlay
          playsInline
          muted
          loop
          preload='auto'
          poster='http://i.imgur.com/xHO6DbC.png'
        >
          <source src='https://storage.coverr.co/videos/7RzPQrmB00s01rknm8VJnXahEyCy4024IMG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjI5MTg2NjA0fQ.M8oElp5VNO8bWEWmdF2nGiu3qDOOYRFfP8wkKvl8I20' />
        </video>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 285 80'
          preserveAspectRatio='xMidYMid slice'
        >
          <defs>
            <mask
              id='mask'
              x='0'
              y='0'
              width='100%'
              height='100%'
            >
              <rect
                x='0'
                y='0'
                width='100%'
                height='100%'
                fill='white'
              />
              <text
                x='72'
                y='50'
                fill='black'
              >
                Nothing's New
              </text>
            </mask>
          </defs>
          <rect
            x='0'
            y='0'
            width='100%'
            height='100%'
            fill='black'
            mask='url(#mask)'
          />
        </svg>
      </div>
    </Container>
  );
};

export default Auth_google_success;

const Container = styled.div`
  .wrapper {
      height: 100vh;
    position: relative;
    width: 100vw;
    overflow: hidden;
  }
  .wrapper video {
    width: 100%;
  }
  .wrapper svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .wrapper svg text {
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 15px;
  }
  .wrapper svg > rect {
    -webkit-mask: url(#mask);
    mask: url(#mask);
  }
  .wrapper svg rect {
    fill: #fff;
  }
  .wrapper:before,
  .wrapper:after {
    content: "";
    position: absolute;
    top: 0;
    /* width: 10px; */
    height: 100%;
    background-color: #fff;
  }
  .wrapper:before {
    /* left: -9px; */
  }
  .wrapper:after {
    right: -15px;
  }
`;
