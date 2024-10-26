import { Menu, Avatar, Indicator } from "@mantine/core";
import {
  IconTrash,
  IconUser,
  IconLogout2,
  IconUserEdit,
} from "@tabler/icons-react";
import { TbActivity } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const { user,onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const signOff = () => {
    dispatch({ type: "SIGN_OFF" });
  };
  const DeleteAccount = () => {
    var result = confirm("Are you sure to delete the Account?");
    if (result) {
      dispatch({ type: "DELETE_ACCOUNT", data: user._id });
    }
  };
  const handleRightClick = (e) => {
    e.preventDefault();
  };
  
  const profilePicName = user.userName.length>1?
  (user.userName[0] + user.userName[user.userName.length - 1]).toUpperCase():user.userName.toUpperCase();
  const userIsOnline= onlineUsers.find((data)=>data===user._id)
  return (
    <Menus
      shadow='md'
      width={200}
    >
      <Menu.Target>
        <Indicator
          size={10}
          withBorder
          processing
          disabled={!user.isOnline && !userIsOnline}
        >
          <Avatar
          color="blue"
            onContextMenu={handleRightClick}
            src={user.profilePicUrl}
            alt={user.userName}
          >
            {profilePicName}
          </Avatar>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>@{user.userName}</Menu.Label>

        <Menu.Item
          icon={<IconUser size={14} />}
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
        >
          Profile
        </Menu.Item>

        <Menu.Item
          icon={<IconUserEdit size={14} />}
          onClick={() => {
            navigate("/editprofile");
          }}
        >
          Edit Profile
        </Menu.Item>
        <Menu.Item
          icon={<TbActivity size={14} />}
          onClick={() =>
            navigate("/your_activity/likedPost", { replace: true })
          }
        >
          Your Activity
        </Menu.Item>
        {!user.googleId && (
          <Menu.Item
            icon={<RiLockPasswordFill size={14} />}
            onClick={() => navigate("/forgetPassword", { replace: true })}
          >
            Change Password
          </Menu.Item>
        )}

        <Menu.Item
          icon={<IconLogout2 size={14} />}
          onClick={signOff}
        >
          Logout
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color='red'
          icon={<IconTrash size={14} />}
          onClick={DeleteAccount}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menus>
  );
};

export default User;

const Menus = styled(Menu)`
  cursor: pointer;
`;
