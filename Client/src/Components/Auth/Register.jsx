import {
  Box,
  Input,
  LoadingOverlay,
  PasswordInput,
} from "@mantine/core";
import { styled } from "styled-components";
import { IconAt, IconLock, IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";

const Register = ({ close }) => {
  const [reg, setreg] = useState({
    first: "",
    last: "",
    profile: "",
    emailid: "",
    username: "",
    password: "",
  });
  const [visible, toggle ] = useState(false);

  const imagetobase64 = (e) => {
    var read = new FileReader();
    read.readAsDataURL(e.target.files[0]);
    read.onload = () => {
      setreg({ ...reg, profile: read.result });
    };
    read.onerror = (err) => {
      console.log(err);
    };
  };

  const handleSubmit = (e) => {
    toggle(true);
    e.preventDefault();
    axios
      .post("http://localhost:5010/auth/register", reg)
      .then((res) => {
        console.log(res);
        close(false);
        notifications.show({
          title: "Registered Successfully",
          message: "Hey there, welcome to our community",
        });
      })
      .catch((err) => {
        console.log(err);
        toggle(false)
      });
  };
  console.log(reg);
  return (
    <Container>
      <Box
        maw={400}
        pos='relative'
      >
        <LoadingOverlay
          visible={visible}
          overlayBlur={2}
        />
        <Form onSubmit={handleSubmit}>
          <Name>
            <Input.Wrapper
              label='First Name'
              withAsterisk
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
          <label>Profile Image </label>
          <input
            type='file'
            id='images'
            accept='image/*'
            onChange={imagetobase64}
          />
          <Input
            icon={<IconUserCircle />}
            placeholder='Your UserName'
            radius='md'
            value={reg.username}
            onChange={(e) => {
              setreg({ ...reg, username: e.target.value });
            }}
          />
          <Input
            icon={<IconAt />}
            placeholder='Your email'
            radius='md'
            value={reg.emailid}
            onChange={(e) => {
              setreg({ ...reg, emailid: e.target.value });
            }}
          />
          <PasswordInput
            placeholder='Your password'
            icon={<IconLock size='1rem' />}
            value={reg.password}
            onChange={(e) => {
              setreg({ ...reg, password: e.target.value });
            }}
          />
          <RegisterBtn type='submit'>Register</RegisterBtn>
        </Form>
      </Box>
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

const Name = styled.div`
  display: flex;
  gap: 20px;
`;

const Date = styled(DateInput)`
  background: red;
`;
