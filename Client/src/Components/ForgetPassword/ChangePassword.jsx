import { Button, Input, PasswordInput, Text } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    newPassord: "",
    confirmPassword: "",
  });
  const { isforgetPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = () => {
    if (newPassword.length === 0) {
      setErrorMessage((prev) => ({
        ...prev,
        newPassord: "New password is required",
      }));
    } else if (!validatePassword(newPassword)) {
      setErrorMessage((prev) => ({
        ...prev,
        newPassord:
          "Password must contain at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long.",
      }));
    } else if (confirmPassword.length == 0) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "New password is required",
      }));
    } else if (!validatePassword(confirmPassword)) {
      setErrorMessage((prev) => ({
        ...prev,
        newPassord:
          "Password must contain at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long.",
      }));
    } else if (newPassword !== confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "Password not match.",
      }));
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
        error={errorMessage.newPassord}
      >
        <PasswordInput
          placeholder='Enter New Password'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Input.Wrapper>

      <Input.Wrapper
        label='Confirm New Password'
        mt='md'
        error={errorMessage.confirmPassword}
      >
        <PasswordInput
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
