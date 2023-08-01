import { styled } from "styled-components";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Log_in_button = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dis, setdis] = useState(false);
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        {dis ? <Login /> : <Register />}
        <button onClick={() => setdis((prev) => (prev ? false : true))}>
          {dis ? <label>Don&acute;t have an account? Register</label> : <label>Have an account? Login</label>}
        </button>
      </Modal>
      <Group position="center">
        <Button onClick={open} radius={"xl"} color="indigo">
          Sign up/ Sign in
        </Button>
      </Group>
    </>
  );
};

export default Log_in_button;

