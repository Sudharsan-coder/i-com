import { Input, PasswordInput } from "@mantine/core";
import { styled } from "styled-components";
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react";

const Register = () => {
  return (
    <Container>
      <Form>
        <Name>
          <Input.Wrapper label="First Name" withAsterisk>
            <Input placeholder="Your First Name" radius="md" />
          </Input.Wrapper>
          <Input.Wrapper label="Last Name" withAsterisk>
            <Input
              placeholder="Your Last Name"
              radius="md"
            />
          </Input.Wrapper>
        </Name>
        <Input
          icon={<IconUserCircle />}
          placeholder="Your UserName"
          radius="md"
        />
        <Input icon={<IconAt />} placeholder="Your email" radius="md" />
        <PasswordInput
          placeholder="Your password"
          icon={<IconLock size="1rem" />}
        />
        <RegisterBtn type="submit">Register</RegisterBtn>
      </Form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
`;
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

const Name = styled.div`
  display: flex;
  gap: 20px;
`;
