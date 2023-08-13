import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { styled } from 'styled-components';
import Single_user_card from '../Components/Auth/Single_user_card';
import { useAuth } from '../context/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main_post from '../Components/Post/Main_post';
import MainpageLoading from '../Components/Loading/MainpageLoading';
const Search = () => {
  const [post,setPost]=useState([]);
  const [user,setUser]=useState([]);
  const auth=useAuth();
  const [Loading,setLoading]=useState(true)
  useEffect(()=>{
      axios.get(`http://localhost:5010/post/AllPost?search=${auth.search}`)
      .then((res)=>{
          setPost(res.data);
          setLoading(false)
          console.log(res.data);
      })
      .catch((err)=>{
          console.log(err);
      })
      
      axios.get(`http://localhost:5010/user/all?search=${auth.search}`)
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
    <div className='DS'>

        <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>Gallery</Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>Messages</Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>Settings</Tabs.Tab>
        </Tabs.List>
  
        <Tabs.Panel value="gallery" pt="xs">
          {Loading?(<MainpageLoading/>): <Main_post Post={post} />}
        </Tabs.Panel>
  
        <Tabs.Panel value="messages" pt="xs">
          {Loading?(<MainpageLoading/>): <Single_user_card User={user}/>}
        </Tabs.Panel>
  
        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </div>
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
  }
`