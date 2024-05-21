import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { useState } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { useAuth } from "../../context/auth";
import { styled } from "styled-components";
import User from "../Auth/User";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
const ProfileCardBtn = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigator = useNavigate();
  const [dis, setdis] = useState(false);
  const auth = useAuth();
  // const [showModel, setShowModel] = useState(true);
  return (
    <>
      {auth.showModel && (
        <Modal
          opened={opened}
          onClose={close}
          title='Authentication'
          centered
        >
          {dis ? (
            <Login close={auth.setShowModel} />
          ) : (
            <Register close={auth.setShowModel} />
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
      
      <Group position='center'>
        {Object.keys(auth.user).length === 0 ? (
          <Button
            onClick={() => {
              auth.setShowModel(true);
              open();
            }}
            radius={"xl"}
            color='indigo'
          >
            Sign up/ Sign in
          </Button>
        ) : (
          <Profile>
            <Button
              variant="light"
              onClick={() => {
                navigator(`/profile/${auth.user._id}`)
              }}
            >
              View Full Profile
            </Button>
          </Profile>
        )}
      </Group>
      {/* {show_post_box && <Post_create_box setShow={setShow_post_box}/>} */}
    </>
  );
};

export default ProfileCardBtn;

const Navbtn = styled.button`
  all: unset;
  font-size: 12px;
  &:hover {
    text-decoration: underline blueviolet;
  }
`;

const Profile=styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`