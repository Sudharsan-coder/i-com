import { useEffect, useState } from "react";
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../context/auth";
import MainpageLoading from "../Components/Loading/MainpageLoading";
import ProfileCard from "../Components/Profile/ProfileCard";
import TopRecentTag from "../Components/Post/TopRecentTag";

const Main_page = () => {
  const [post, setPost] = useState([]);
  const auth = useAuth();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5010/post/AllPost`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container>
        <ProfileCard />
        {Loading ? <MainpageLoading /> : <Main_post Post={post} />}
        <TopRecentTag/>
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
