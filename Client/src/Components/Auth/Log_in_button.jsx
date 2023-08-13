import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../../context/auth";
import { styled } from "styled-components";
import Post_create_box from "../Post_create/Post_create_box.jsx";
import User from "./User";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
const Log_in_button = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [opened_post, post_obj] = useDisclosure(false);
  // const [show_post_create,setShow_post_create]=useState(true);
  const [dis, setdis] = useState(false);
  const auth = useAuth();
  const [show_post_box, setShow_post_box] = useState(true);
  const [showModel, setShowModel] = useState(true);
  return (
    <>
      {showModel && (
        <Modal
          opened={opened}
          onClose={close}
          title='Authentication'
          centered
        >
          {dis ? (
            <Login close={setShowModel} />
          ) : (
            <Register close={setShowModel} />
          )}
          <Navbtn onClick={() => setdis((prev) => (prev ? false : true))}>
            {dis ? (
              <label>Don&acute;t have an account? Register</label>
            ) : (
              <label>Have an account? Login</label>
            )}
          </Navbtn>
        </Modal>
      )}
      
      {show_post_box && (
        <Modal
          opened={opened_post}
          onClose={post_obj.close}
          size='540px'
          title='Create Post'
          centered
        >
          <Post_create_box close={setShow_post_box} />
        </Modal>
      )}
      
      <Group position='center'>
        {!auth.user.username ? (
          <Button
            onClick={() => {
              setShowModel(true);
              open();
            }}
            radius={"xl"}
            color='indigo'
          >
            Sign up/ Sign in
          </Button>
        ) : (
          <Log>
            <User />
            <Button
            leftIcon={<IconSquareRoundedPlus/>}
              onClick={() => {
                post_obj.open();
              }}
            >
              Create Post
            </Button>
          </Log>
        )}
      </Group>
      {/* {show_post_box && <Post_create_box setShow={setShow_post_box}/>} */}
    </>
  );
};

export default Log_in_button;

const Navbtn = styled.button`
  all: unset;
  font-size: 12px;
  &:hover {
    text-decoration: underline blueviolet;
  }
`;

const Log=styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`