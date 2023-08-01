import { styled } from "styled-components"
import Like_pallet from "../Components/Post_display/Like_pallet.jsx"
import Post from "../Components/Post_display/Post.jsx"
const Post_page_display = () => {
  return (
    <Container>
      <Like_pallet/>
      <Post/>
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