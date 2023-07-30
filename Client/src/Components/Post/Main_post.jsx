//containers all the posts
import { styled } from 'styled-components';
import Post from "./Single_post.jsx"
const Main_post = () => {
  return (
    <Container>
        <Post/>
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
    display: flex;
    flex-direction: column;
    gap: 20px;
`