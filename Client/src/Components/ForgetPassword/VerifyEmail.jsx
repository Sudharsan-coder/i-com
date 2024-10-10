import { Button, Input, Text } from '@mantine/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setForgetPasswordVerificationEmail } from '../../Redux/Slices/authSlice';

const VerifyEmail = () => {
    const { isforgetPassword } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const handleSendOtp = () => {
        dispatch({ type: "SEND_OTP", data: isforgetPassword.email });
      };
  return (
    <Content>
              <Text c='dimmed'>
                Enter your registered email address, and we will send you an OTP
                to verify your identity and reset your password.
              </Text>
              <Input.Wrapper label='Email Id'>
                <Input
                  placeholder='example@gmail.com'
                  onChange={(e) => dispatch(setForgetPasswordVerificationEmail(e.target.value))}
                />
              </Input.Wrapper>
              <Text
                size='xs'
                mt='sm'
                c='dimmed'
              >
                Please check your inbox for the verification code after
                submitting your email. The OTP will expire in 10 minutes.
              </Text>

              <Button
                mt='md'
                variant='filled'
                color='blue'
                onClick={handleSendOtp} 
              >
                Send OTP
              </Button>
              {isforgetPassword.isVerificationFailed && (
                <Text color='red'>
                  {isforgetPassword.isVerificationFailedMessage}
                </Text>
              )}
            </Content>
  )
}

export default VerifyEmail

const Content = styled.div`
  /* margin: 20px; */
`;
