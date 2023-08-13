import { Menu, Avatar } from '@mantine/core';
import {  IconMessageCircle, IconTrash, IconUser, IconLogout2, IconUserEdit } from '@tabler/icons-react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const User = () => {
    const auth = useAuth();
    const navigate=useNavigate();
  return (
    <Menus shadow="md" width={200}>
      <Menu.Target>
      <Avatar src={auth.user.profile} alt={auth.user.username}  />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label >@{auth.user.username}</Menu.Label>
        <Menu.Item icon={<IconUser size={14} /> } onClick={()=>{navigate(`/profile/${auth.user.username}`)}}>Profile</Menu.Item>
        <Menu.Item icon={<IconUserEdit size={14} /> } onClick={()=>{navigate("/editprofile")}}>Edit Profile</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconLogout2 size={14} /> } onClick={()=>{auth.logout()}}>Logout</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menus>
  )
}

export default User


 const Menus=styled(Menu)`
  cursor: pointer;
`
    