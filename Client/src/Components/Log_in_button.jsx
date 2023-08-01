import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../context/auth";
import { styled } from "styled-components";
import Post_create_box from "./Post_create/Post_create_box.jsx"
const Log_in_button = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [dis, setdis] = useState(false);
  const auth = useAuth();
  const [show_post_box,setShow_post_box]=useState(false);
  const [showModel,setShowModel]=useState(true);
  return (
    <>
     {showModel && <Modal opened={opened} onClose={close} title="Authentication" centered>
        {dis ? <Login close={setShowModel}/> : <Register close={setShowModel}/>}
        <Navbtn onClick={() => setdis((prev) => (prev ? false : true))}>
          {dis ? (
            <label>Don&acute;t have an account? Register</label>
          ) : (
            <label>Have an account? Login</label>
          )}
        </Navbtn>
      </Modal>}
      <Group position="center">
        {!auth.user ? (
          <Button onClick={()=>{setShowModel(true);open()}} radius={"xl"} color="indigo">
            Sign up/ Sign in
          </Button>
        ) : (
        <div>
          <Button>{auth.user}</Button>
          <Button onClick={setShow_post_box(true)}>+</Button>
        </div>
        )}
      </Group>
      {show_post_box && <Post_create_box setShow={show_post_box}/>}
    </>
  );
};

export default Log_in_button;

const Navbtn=styled.button`
  all: unset;
  font-size: 12px;
  &:hover{
    text-decoration: underline  blueviolet ;
  }
`