import { useEffect, useState } from "react";
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../context/auth";

const Main_page = () => {
  const [post,setPost]=useState([]);
  const auth=useAuth();
  useEffect(()=>{
      axios.get(`http://localhost:5010/post/AllPost?search=${auth.search}`)
      .then((res)=>{
          setPost(res.data);
          console.log(res.data);
      })
      .catch((err)=>{
          console.log(err);
      })
  })
  return (
    <>
      <Container>
        
          <Main_post Post={post} />
      
      </Container>
    </>
  );
};

export default Main_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.7fr 2fr 0.8fr;
  grid-row-gap: 50px;
`;
