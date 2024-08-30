//containers all the posts
import { styled } from 'styled-components';
import Single_post from "./Single_post.jsx"
const Main_post = (props) => {
const PostArray=props.Post.posts;
console.log(PostArray);
  return (
    <Container>
    {
      PostArray.map((Post)=>
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
    margin-bottom: 20px;
`