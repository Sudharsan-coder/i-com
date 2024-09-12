import { Modal, Group, Button } from "@mantine/core";
import { styled } from "styled-components";
import Post_create_box from "../Post_create/Post_create_box.jsx";
import User from "./User";
import {  IconSquareRoundedPlus } from "@tabler/icons-react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";
import {openCreatePostModel, closeCreatePostModel} from '../../Redux/Slices/publicPostsSlice.js'
const Log_in_button = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { createPostModel } = useSelector((state) => state.publicPosts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openModel = ()=>{
    dispatch(openCreatePostModel())
  }
  
  const closeModel = ()=>{
    dispatch(closeCreatePostModel());
  }
  return (
    <>
      
        <Modal
          opened={createPostModel}
          onClose={closeModel}
          fullScreen
          title='Create Post'
          centered
        >
          <Post_create_box />
        </Modal>
      

      <Group position='center'>
        {isAuth ? (
          <Log>
            <Button variant="default" >
            <AiOutlineMessage  size={20} />
            </Button>
            <Button variant="default" >
            <FaChalkboardTeacher   size={20} />
            </Button>
            <User />
            <Button
              leftIcon={<IconSquareRoundedPlus />}
              onClick={openModel}
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
