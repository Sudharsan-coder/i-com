import { styled } from "styled-components"
import Like_pallet from "../Components/Post_display/Like_pallet.jsx"
import Post from "../Components/Post_display/Post.jsx"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Post_page_display = () => {
  const params = useParams();
  const postid = params.id;
  const [postdetails, setPostDetails] = useState(null);
  console.log(postid);
  useEffect(() => {
    axios
      .get(`http://localhost:5010/post?postid=${postid}`)
      .then((res) => {
        setPostDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(postdetails);
  return (
    <Container>
    <Like_pallet {...postdetails}/>
     {postdetails &&
      <Post {...postdetails}/>}
    </Container>
  )
}
export default Post_page_display

const Container=styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.3fr 3fr 1fr;
  background: rgb(245, 245, 245);
`