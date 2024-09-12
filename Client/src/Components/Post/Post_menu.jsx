import { Button, CopyButton, Menu } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import { RiEditLine } from "react-icons/ri";
import { IconTrash } from "@tabler/icons-react";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { reportToPostStarted } from "../../Redux/Slices/publicPostsSlice";

const Post_menu = ({ userId, postId }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deletePost = () => {
    var result = confirm("Are you sure to delete the Post?");
    if (result) dispatch({ type: "DELETE_POST", data: { postId } });
  };
// const postURL = `https://icom-okob.onrender.com/post/${postId}`;
const postURL = `http://localhost:5173/post/${postId}`;
  return (
    <Menu
      shadow='md'
      width={150}
      
    >
      <Menu.Target>
        <Button
          leftIcon={<CiMenuKebab />}
          style={{ all: "unset" }}
        ></Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<MdOutlineReportGmailerrorred size={14} />} onClick={()=>dispatch(reportToPostStarted())}>
          Report
        </Menu.Item>
        <CopyButton
          value={postURL}
          timeout={2000}
        >
          {({ copied, copy }) => (
            <Menu.Item
              icon={<MdContentCopy size={14} />}
              onClick={copy}
            >
              Copy Post link
            </Menu.Item>
          )}
        </CopyButton>
        <Menu.Item icon={<FaRegBookmark size={14} />}>Save Post</Menu.Item>
        <Menu.Item
          icon={<RiEditLine size={14} />}
          disabled={user._id !== userId}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          color='red'
          icon={<IconTrash size={14} />}
          disabled={user._id !== userId}
          onClick={deletePost}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Post_menu;

const Container = styled.div``;
