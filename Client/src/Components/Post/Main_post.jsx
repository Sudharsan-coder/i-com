//containers all the posts
import { styled } from 'styled-components';
import Post from "./Single_post.jsx"
const Main_post = () => {
  return (
    <Container>
        <Post/>
    </Container>
  )
}
export default Main_post;

const Container=styled.div`
    grid-column:2;
    height:90vh;
    padding:3%;
    box-sizing:border-box;
    background:rgb(245, 245, 245);
    `