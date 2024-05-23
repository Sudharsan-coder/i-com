import { useEffect, useState } from "react";
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../context/auth";
import MainpageLoading from "../Components/Loading/MainpageLoading";
import ProfileCard from "../Components/Profile/ProfileCard";
import TopRecentTag from "../Components/Post/TopRecentTag";

const Main_page = () => {

  const [Loading, setLoading] = useState(true);
  const auth = useAuth()

  useEffect(() => {
    console.log(auth.post);
    if(Object.entries(auth.post).length !== 0){
      setLoading(false);
      return;
    } 
    console.log("API CALLING")
      axios
        .get(
          `https://icom-okob.onrender.com/post`
        )
        .then((res) => {
          auth.setPost(res.data);
          setLoading(false);
          console.log(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  // console.log( totalpage);
// console.log(post)
  return (    <>
      <Container>
        {/* <ProfileCard /> */}
        {Loading ? (
          <MainpageLoading />
        ) : Object.entries(auth.post).length!==0? (
            <Main_post Post={auth.post} />
        ) : (
          <h1>No data</h1>
        )}
        <TopRecentTag />
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
