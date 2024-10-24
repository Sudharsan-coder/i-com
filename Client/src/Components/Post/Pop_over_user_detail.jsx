import { Avatar, Text } from '@mantine/core'
import React from 'react'
import styled from 'styled-components'

const Pop_over_user_detail = (props) => {
    const { userName = "", profilePicUrl, _id,userBio,firstName } = props.user || {};
    const profilePicName = userName.length > 1 
    ? (userName[0] + userName[userName.length - 1]).toUpperCase() 
    : userName.toUpperCase();
  return (
    <Container>
      <Avatar
      color="blue"
        src={profilePicUrl}
        size={50}
        radius="xl"
      >
        {profilePicName}
      </Avatar>
      <Text fw={700} size="lg">{firstName}</Text>
      <Text  c="dimmed">@{userName}</Text>
      <Text  ta="center" >{userBio}</Text>
      
    </Container>
  )
}

export default Pop_over_user_detail

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
