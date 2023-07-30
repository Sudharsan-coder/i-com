import { Input, PasswordInput } from "@mantine/core";
import { styled } from "styled-components";
import { IconAt, IconLock } from "@tabler/icons-react";

const Register = () => {
  return (
    <Container>
      <h4>Register</h4>
      <Form>
        <input type="type" value="" placeholder="Username" />
        <Input icon={<IconAt />} placeholder="Your email" radius="md" />
        <PasswordInput
          label="Your password"
          placeholder="Your password"
          icon={<IconLock size="1rem" />}
        />
        <RegisterBtn type="submit">Register</RegisterBtn>
      </Form>
    </Container>
  );
};

export default Register;

const Container = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  input {
    padding: 0.5rem;
  }
`;
const RegisterBtn = styled.button`
  padding: 0.6rem;
  color: white;
  background-color: #3939f4;
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
