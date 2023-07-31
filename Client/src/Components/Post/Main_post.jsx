//containers all the posts
import { styled } from 'styled-components';
import Single_post from "./Single_post.jsx"
import { useEffect, useState } from 'react';
import axios from 'axios';
const Main_post = () => {

const [post,setPost]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5010/post/AllPost')
        .then((res)=>{
            setPost(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <Container>
    {
      post.map((Post)=>
        (
          <Single_post {...Post} key={Post._id}/>
         )
        )
      }
    </Container>
  )
}
export default Main_post;

const Container=styled.div`
    grid-column:2;
    height:90vh;
    padding:3%;
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
`