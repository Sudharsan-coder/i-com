import { Avatar, Box, Title} from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'


const Single_user_card = (props) => {
console.log(props.User)
const UserArray=props.User;
const navigate=useNavigate();
  return (
  <Container>
  {
    UserArray.map((data)=>(

      <Boxs bg={"white"} key={data._id}>
        <Wrap>
        <Avatar src={data.profilePicUrl} alt="it's" size={"lg"}/>
        <Username order={1} onClick={()=>navigate(`/profile/${data.userName}`)}>{data.userName}</Username>
        </Wrap>
      </Boxs>
      // console.log(data);
    ))
  }

  </Container>
  )
}

export default Single_user_card

const Container=styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Wrap=styled.div`
  display: flex;
  gap: 40px;
  /* align-items: center; */
  
`
const Boxs=styled(Box)`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  text-transform: capitalize;
`
const Username=styled(Title)`
  &:hover{
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    
  }
`