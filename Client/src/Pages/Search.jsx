import { Tabs } from '@mantine/core';
import { IconPhoto} from '@tabler/icons-react';
import { styled } from 'styled-components';
import Single_user_card from '../Components/Auth/Single_user_card';
import { useAuth } from '../context/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main_post from '../Components/Post/Main_post';
import MainpageLoading from '../Components/Loading/MainpageLoading';
import { IconUser } from '@tabler/icons-react';
const Search = () => {
  const [post,setPost]=useState([]);
  const [user,setUser]=useState([]);
  const auth=useAuth();
  const [Loading,setLoading]=useState(true)
  useEffect(()=>{
      axios.get(`https://icom-okob.onrender.com/post?search=${auth.search}`)
      .then((res)=>{
          setPost(res.data);
          setLoading(false)
          console.log(res.data);
      })
      .catch((err)=>{
          console.log(err);
      })
      
      axios.get(`https://icom-okob.onrender.com/user?search=${auth.search}`)
      .then((res)=>{
          setUser(res.data);
          setLoading(false);
          console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  },[auth.search])

  return (
    <Container>

        <Tabs defaultValue="gallery" className='DS'>
        <Tabs.List>
          <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>Posts</Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconUser size="0.8rem" />}>Users</Tabs.Tab>
        </Tabs.List>
  
        <Tabs.Panel value="gallery" pt="xs">
          {Loading?(<MainpageLoading/>): ( post.posts.length!==0? <Main_post Post={post} /> : <h1>No Result</h1>)}
        </Tabs.Panel>
  
        <Tabs.Panel value="messages" pt="xs">
          {Loading?(<MainpageLoading/>): ( user.length!==0? <Single_user_card User={user}/>:<h1>No Result</h1>)}
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

export default Search


const Container= styled.div`
  
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.7fr 2fr 0.8fr;
  grid-row-gap: 50px;
  .DS{
    grid-column: 2;
    margin-top: 40px;
  }
`