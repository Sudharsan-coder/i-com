import React, { useEffect } from "react";
import styled from "styled-components";
import { Stepper, Button, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import OtpVerification from "../Components/ForgetPassword/OtpVerification";
import VerifyEmail from "../Components/ForgetPassword/VerifyEmail";
import ChangePassword from "../Components/ForgetPassword/ChangePassword";
import { useNavigate } from "react-router-dom";
import { resetForgetPasswordVerification } from "../Redux/Slices/authSlice";
import Logo from "../Components/Logo";

const ForgetPassword = () => {
  const { isforgetPassword } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetForgetPasswordVerification());
  }, []);
  return (
    <Container>
      <Heading>
        <Logo />
      </Heading>
      <Wrapper>
        <Stepper
          active={isforgetPassword.activeStep}
          allowNextStepsSelect={false}
          style={{ minWidth: "600px" }}
        >
          <Stepper.Step
            label='First step'
            description='Verify Email'
            allowStepClick={false}
            loading={
              isforgetPassword.activeStep == 0 && isforgetPassword.isVerifying
            }
          >
            <VerifyEmail />
          </Stepper.Step>
          <Stepper.Step
            label='Second step'
            description='OTP Verfication'
            loading={
              isforgetPassword.activeStep == 1 && isforgetPassword.isVerifying
            }
          >
            <OtpVerification />
          </Stepper.Step>
          <Stepper.Step
            label='Final step'
            description='Change Password'
            loading={
              isforgetPassword.activeStep == 2 && isforgetPassword.isVerifying
            }
          >
            <ChangePassword />
          </Stepper.Step>
          <Stepper.Completed>
            <Text c='dimmed'>Your Password changed Successfully.</Text>
            <Button
              mt='md'
              variant='filled'
              color='blue'
              onClick={() => navigate("/sign_in")}
            >
              Go to Sign In Page
            </Button>
          </Stepper.Completed>
        </Stepper>
      </Wrapper>
    </Container>
  );
};

export default ForgetPassword;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  height: 100vh;
  width: 100vw;
`;
const Wrapper = styled.div`
  max-width: 600px;
  border-radius: 15px;
  padding: 60px;
  box-shadow: 0px 0.7px 2.2px rgba(0, 0, 0, 0.02),
    0px 1.6px 5.3px rgba(0, 0, 0, 0.028), 0px 3px 10px rgba(0, 0, 0, 0.035),
    0px 5.4px 17.9px rgba(0, 0, 0, 0.042), 0px 10px 33.4px rgba(0, 0, 0, 0.05),
    0px 24px 80px rgba(0, 0, 0, 0.07);
  .mantine-Stepper-content {
    padding: 30px;
  }
`;

const Heading = styled.div`
  text-align: center;
  font-size: 45px;
  .title {
    font-size: 28px;
  }
`;
