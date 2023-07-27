//has the user info for the post
import { styled } from "styled-components";

import user_pic from "../../assets/logo.png"
import {Link} from "react-router-dom"
const User_detail = () => {
  return (
    <Container>
      <div className="frame1">
        <Link to="/profile"><img src={user_pic} alt="pic" /></Link>
        <div className="frame1_content">
        <div className="user_name">Sudharsan</div>
        <div className="date">Posted on 22 Jan</div>
        </div>
      </div>
      
    </Container>
  );
};

export default User_detail;




const Container=styled.div`
.frame1{
  display: flex;
  align-items: center;
  img{
      height: 50px;
      width:50px;
      border-radius: 15px;
  }
  .user_name{
      font-size: 1.2em;
  }
  .frame1_content{
      margin-left:15px;
  }
  .date{
      color:rgb(113, 113, 113);
      font-size: 0.9em;
  }
}
`