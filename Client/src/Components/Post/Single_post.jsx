//has single post in the main_post 
import {styled} from "styled-components"
import User_det from "./User_detail.jsx"
const Single_post = () => {
  return (
    <Container>
        <User_det/>
    </Container>
  )
}

export default Single_post

const Container=styled.div`
    background:yellow;
    height:fit-content;
    border-radius:10px;
`