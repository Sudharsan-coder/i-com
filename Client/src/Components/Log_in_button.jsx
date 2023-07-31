import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../context/auth";

const Log_in_button = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dis, setdis] = useState(false);
  const auth = useAuth();
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {dis ? <Login /> : <Register />}
        <button onClick={() => setdis((prev) => (prev ? false : true))}>
          {dis ? (
            <label>Don&acute;t have an account? Register</label>
          ) : (
            <label>Have an account? Login</label>
          )}
        </button>
      </Modal>

      <Group position="center">
        {!auth.user ? (
          <Button onClick={open} radius={"xl"} color="indigo">
            Sign up/ Sign in
          </Button>
        ) : (
          <Button>{auth.user}</Button>
        )}
      </Group>
    </>
  );
};

export default Log_in_button;
