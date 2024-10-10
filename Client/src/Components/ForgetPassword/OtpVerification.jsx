import { Button, Input, Text } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const OtpVerification = () => {
  const { isforgetPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [OTP, setOTP] = useState("");
const handleVerifyOtp=()=>{
    dispatch({type:"VERIFY_OTP",data:{email:isforgetPassword.email,enteredOTP:OTP}});
}

const handleResendOtp=()=>{
  dispatch({ type: "SEND_OTP", data: isforgetPassword.email });
}

  return (
   
      <Content>
        <Text c='dimmed'>
          Please enter the OTP sent to your registered email address. This code
          will help us verify your identity to proceed with resetting your
          password.
        </Text>
        <Input.Wrapper label='OTP' >
          <Input placeholder='Enter OTP'value={OTP} onChange={(e)=>setOTP(e.target.value)} />
        </Input.Wrapper>
        <Text
          size='xs'
          mt='sm'
          c='dimmed'
        >
          The OTP will expire in 10 minutes. If you did not receive the code,
          check your spam folder or click the button below to resend it.
        </Text>

        <Button
          mt='md'
          variant='filled'
          color='blue'
          onClick={handleVerifyOtp} 
        >
          Verify OTP
        </Button>

        <Button
          mt='sm'
          variant='subtle'
          color='gray'
          onClick={handleResendOtp} 
        >
          Resend OTP
        </Button>
        {isforgetPassword.isVerificationFailed && (
                <Text color='red'>
                  {isforgetPassword.isVerificationFailedMessage}
                </Text>
              )}
      </Content>
   
  );
};

export default OtpVerification;

const Content = styled.div`
  /* margin: 20px; */
`;
