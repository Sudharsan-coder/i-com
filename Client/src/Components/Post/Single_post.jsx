//has single post in the main_post
import { styled } from "styled-components";
import User_detail from "./User_detail.jsx";
import Likes from "./Likes.jsx";
import Heading from "./Heading.jsx";
import { Link } from "react-router-dom";
import Post_menu from "./Post_menu.jsx";
import React from "react";
import Save_post from "./Save_post.jsx";

const Single_post = (props) => {
  // console.log(props);
  return (
    <Container>
      <Block>
      <Header>
        <User_detail {...props} />
        <Post_menu {...props}/>
      </Header>
        <Heading {...props} />
        <div className='icons'>
          <Likes {...props} />
          <Save_post/>
        </div>
      </Block>
    </Container>
  );
};

export default Single_post;

const Container = styled.div`
  background: white;
  height: fit-content;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 10px 5px 14px rgba(0, 0, 0, 0.07);
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3% 2%;
  .heading {
    font-size: 1.8em;
    margin: 0 65px;
    padding: 15px 0px;
    
  }
  .icons {
    margin-left: 65px;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Header = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
