import { Menu, Button } from '@mantine/core';
import {  IconMessageCircle, IconTrash, IconUser, IconLogout2 } from '@tabler/icons-react';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const auth = useAuth();
    const navigate=useNavigate();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>{auth.user}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Menu</Menu.Label>
        <Menu.Item icon={<IconUser size={14} /> } onClick={()=>{navigate(`/profile/${auth.user}`)}}>Profile</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconLogout2 size={14} /> } onClick={()=>{auth.logout()}}>Logout</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default User
