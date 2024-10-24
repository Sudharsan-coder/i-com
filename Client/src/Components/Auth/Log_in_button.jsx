import { Modal, Group, Button, Tooltip } from "@mantine/core";
import { styled } from "styled-components";
import Post_create_box from "../Post_create/Post_create_box.jsx";
import User from "./User";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  openCreatePostModel,
  closeCreatePostModel,
  setPostModelType,
  resetCreatePost,
} from "../../Redux/Slices/publicPostsSlice.js";
const Log_in_button = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { createPostModel, postModelType } = useSelector(
    (state) => state.publicPosts
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openModel = () => {
    dispatch(openCreatePostModel());
    dispatch(resetCreatePost());
    dispatch(setPostModelType("CREATE_POST"));
  };

  const closeModel = () => {
    dispatch(closeCreatePostModel());
  };
  return (
    <>
      <Modal
        opened={createPostModel}
        onClose={closeModel}
        fullScreen
        title={postModelType === "CREATE_POST" ? "Create Post" : "Edit Post"}
        centered
      >
        <Post_create_box />
      </Modal>

      <Group position='center'>
        {isAuth ? (
          <Log>
            <Tooltip label='Message'>
              <Button
                variant='outline'
                style={{ border: "none", padding: 0 }}
              >
                <Link to='/message'>
                  <AiOutlineMessage
                    size={25}
                    color='#1c7ed6'
                  />
                </Link>
              </Button>
            </Tooltip>
            <Tooltip label='WhiteBoard'>
              <Button
                variant='outline'
                style={{ border: "none", padding: 0 }}
              >
                <Link to='/whiteBoard'>
                  <FaChalkboardTeacher
                    size={20}
                    color='#1c7ed6'
                  />
                </Link>
              </Button>
            </Tooltip>
            <User />
            <Button
              leftIcon={<IconSquareRoundedPlus />}
              onClick={openModel}
            >
              Create Blog
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
