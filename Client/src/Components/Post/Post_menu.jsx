import { Button, CopyButton, Menu, Modal } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import { RiEditLine } from "react-icons/ri";
import { IconTrash } from "@tabler/icons-react";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import {
  openCreatePostModel,
  reportToPostStarted,
  setCreatePost,
  setPostModelType,
} from "../../Redux/Slices/publicPostsSlice";
import Share_post from "./Share_post";
import Report_post from "./Report_post";

const Post_menu = (props) => {
  // console.log(props);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [postMenuModal, setPostMenuModal] = useState(false);
  const [postMenuModalType, setPostMenuModalType] = useState({
    type: "",
    component: <></>,
  });

  const openPostMenuModal = () => {
    setPostMenuModal(true);
  };
  const closePostMenuModal = () => {
    setPostMenuModal(false);
  };

  const sharePostHandler = () => {
    openPostMenuModal();
    setPostMenuModalType({
      type: "Share Post",
      component: (
        <Share_post
        shareURL={postURL}
        title={props.title}
        />
      ),
    });
  };
  
  const reportPostHandler = (postUrl) => {
    openPostMenuModal();
    setPostMenuModalType({
      type:"Report Abuse",
      component:<Report_post url={postUrl}/>
    })

  };

  // #region Authorizated Person
  const deletePost = () => {
    var result = confirm("Are you sure to delete the Post?");
    if (result) dispatch({ type: "DELETE_POST", data: { postId: props._id } });
  };

  const handleEditPostButton = () => {
    dispatch(openCreatePostModel());
    dispatch(setPostModelType("EDIT_POST"));
    dispatch(setCreatePost(props));
  };

  const postURL = `https://nothingsnew.netlify.app/post/${props._id}`;
  return (
    <>
      <Modal
        opened={postMenuModal}
        onClose={closePostMenuModal}
        title={postMenuModalType.type}
        centered
        size={"lg"}
        overlayProps={{
          backgroundOpacity: 1,
          blur: 1,
        }}
      >
        {postMenuModalType.component}
      </Modal>

      <MenuButton
        shadow='md'
        width={150}
      >
        <Menu.Target>
          <Button
            leftIcon={<CiMenuKebab />}
            style={{ all: "unset", cursor: "pointer" }}
          ></Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            icon={<MdOutlineReportGmailerrorred size={14} />}
            onClick={()=>reportPostHandler(postURL)}
          >
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
          <Menu.Item
            icon={<PiShareNetworkBold size={14} />}
            onClick={sharePostHandler}
          >
            Share Post
          </Menu.Item>
          {user._id === props.user._id && (
            <>
              <Menu.Item
                icon={<RiEditLine size={14} />}
                disabled={user._id !== props.user._id}
                onClick={handleEditPostButton}
              >
                Edit Post
              </Menu.Item>
              <Menu.Item
                color='red'
                icon={<IconTrash size={14} />}
                disabled={user._id !== props.user._id}
                onClick={deletePost}
              >
                Delete
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </MenuButton>
    </>
  );
};

export default Post_menu;

const MenuButton = styled(Menu)`
  cursor: pointer;
`;
