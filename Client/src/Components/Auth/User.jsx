import { Menu, Avatar } from "@mantine/core";
import {
  IconTrash,
  IconUser,
  IconLogout2,
  IconUserEdit,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const signOff = () => {
    dispatch({ type: "SIGN_OFF" });
  };
  const DeleteAccount = () => {
    var result = confirm("Are you sure to delete the Account?");
    if (result) {
      dispatch({ type: "DELETE_ACCOUNT",data:user._id});
    }
  };
  return (
    <Menus
      shadow='md'
      width={200}
    >
      <Menu.Target>
        <Avatar
          src={user.profilePicUrl}
          alt={user.userName}
        />
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
          icon={<RiLockPasswordFill size={14} />}
          onClick={() => navigate("/forgetPassword")}
        >
          Change Password
        </Menu.Item>
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
