import { Menu, Avatar } from '@mantine/core';
import {  IconMessageCircle, IconTrash, IconUser, IconLogout2, IconUserEdit, IconCircleCheckFilled } from '@tabler/icons-react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { AiFillExclamationCircle } from 'react-icons/ai';

const User = () => {
    const auth = useAuth();
    const navigate=useNavigate();
    
    const DeleteAccount=()=>{
        var result=confirm("Are you sure to delete the Account?");
        if(result){
          notifications.show({
            id: 'load-data',
            loading: true,
            title: 'Deleting your data',
            message: 'Data will be deleted in 3 seconds, you cannot close this yet',
            autoClose: false,
            withCloseButton: false,
          });
          axios.delete(`http://localhost:5010/user/delete`,
          {
            headers: {
              token: `Bearer ${auth.user.accessToken}`,
            },
          }
          )
          .then(()=>{
            notifications.update({
              id: 'load-data',
              title: "Deleted Successfully",
              message: "Your Account is deleted",
              color: "green",
              icon: (
                <IconCircleCheckFilled
                  color='green'
                  size='3rem'
                />
              ),
            });
            auth.logout();
          })
          .catch((err)=>{
            console.log(err);
            notifications.update({
              id: 'load-data',
              title: "Deletion Failed",
              message: "Something went wrong. Please try again.",
              color: "red",
              icon: (
                <AiFillExclamationCircle
                  color='white'
                  size='3rem'
                />
              ),
            });
          })
        }
    }
  return (
    <Menus shadow="md" width={200}>
      <Menu.Target>
      <Avatar src={auth.user.profile} alt={auth.user.userName}  />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label >@{auth.user.userName}</Menu.Label>
        <Menu.Item icon={<IconUser size={14} /> } onClick={()=>{navigate(`/profile/${auth.user._id}`)}}>Profile</Menu.Item>
        <Menu.Item icon={<IconUserEdit size={14} /> } onClick={()=>{navigate("/editprofile")}}>Edit Profile</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconLogout2 size={14} /> } onClick={()=>{auth.logout()}}>Logout</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} /> } onClick={DeleteAccount}>Delete my account</Menu.Item>
      </Menu.Dropdown>
    </Menus>
  )
}

export default User


 const Menus=styled(Menu)`
  cursor: pointer;
`
    