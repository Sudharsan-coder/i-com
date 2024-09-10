import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { styled } from "styled-components";
import Post_create_box from "../Post_create/Post_create_box.jsx";
import User from "./User";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
const Log_in_button = () => {
  const [opened_post, post_obj] = useDisclosure(false);
  const { isAuth } = useSelector((state) => state.auth);
  const { createPostModel } = useSelector((state) => state.publicPosts);
  const navigate = useNavigate();
  return (
    <>
      {createPostModel && (
        <Modal
          opened={opened_post}
          onClose={post_obj.close}
          fullScreen
          title='Create Post'
          centered
        >
          <Post_create_box />
        </Modal>
      )}

      <Group position='center'>
        {isAuth ? (
          <Log>
            <User />
            <Button
              leftIcon={<IconSquareRoundedPlus />}
              onClick={() => {
                post_obj.open();
              }}
            >
              Create Post
            </Button>
          </Log>
        ) : (
          <Button
            onClick={() => {
              navigate("/sign_in");
            }}
            radius={"xl"}
            color='indigo'
          >
            Sign up/ Sign in
          </Button>
        )}
      </Group>
      {/* {show_post_box && <Post_create_box setShow={setShow_post_box}/>} */}
    </>
  );
};

export default Log_in_button;

const Log = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
