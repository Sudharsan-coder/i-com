import { Button, Input, Text } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);
  const { isforgetPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMatchPassword(false);
    } else {
      dispatch({
        type: "CHANGE_PASSWORD",
        data: { email: isforgetPassword.email, password: confirmPassword },
      });
    }
  };

  return (
    <Content>
      <Text c='dimmed'>
        Your new password to reset your account's password.
      </Text>

      <Input.Wrapper
        label='New Password'
        mt='md'
      >
        <Input
          placeholder='Enter New Password'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label='Confirm New Password'
        mt='md'
      >
        <Input
          placeholder='Confirm New Password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Input.Wrapper>

      <Button
        mt='md'
        variant='filled'
        color='blue'
        onClick={handleChangePassword}
      >
        Change Password
      </Button>
      {!matchPassword && (
        <Text color='red'>Password not match. Please Correct it.</Text>
      )}
      {isforgetPassword.isVerificationFailed && (
        <Text color='red'>{isforgetPassword.isVerificationFailedMessage}</Text>
      )}
    </Content>
  );
};

export default ChangePassword;
const Content = styled.div`
  /* margin: 20px; */
`;
