import { useEffect, useState } from "react";
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../context/auth";
import MainpageLoading from "../Components/Loading/MainpageLoading";
import ProfileCard from "../Components/Profile/ProfileCard";
import TopRecentTag from "../Components/Post/TopRecentTag";
import InfiniteScroll from "react-infinite-scroll-component";

const Main_page = () => {
  const [res,setRes] = useState({totalpage: 1, post:[]});
  const [totalpage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [post, setPost] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("API CALLING")
    console.log(page)
    if (page <= totalpage) {
      axios
        .get(
          `http://localhost:5010/post/AllPost/657dcf8009c183a1147db831?page=${page}&pageSize=1`
        )
        .then((res) => {
          setTotalPage(res.data.totalPages);
          setPost((prevPost) => [...prevPost, ...res.data.post]);
          setLoading(false);
          console.log(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("over")
      sethasMore(false);
    }
  }, [page]);
  console.log( totalpage);
// console.log(post)
  return (    <>
      <Container>
        <ProfileCard />
        {Loading ? (
          <MainpageLoading />
        ) : post.length != 0 ? (
          <InfiniteScroll
            dataLength={post.length}
            next={() => {
              setPage((prev) => prev + 1);
              console.log(page)
            }}
            hasMore={hasMore}
            loader={<h1>Loading....</h1>}
            
          >
            <Main_post Post={post} />

            {/* <h1>{post}</h1> */}
          </InfiniteScroll>
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
