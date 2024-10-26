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
          <Save_post postDetail={props}/>
        </div>
      </Block>
    </Container>
  );
};

export default Single_post;

const Container = styled.div`
  background: white;
  height: fit-content;
  margin-bottom: 20px;
  border-radius: 0.5rem;
  box-sizing: border-box;
  border: 0.0625rem solid #dee2e6;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem;
  padding: 1.25rem
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
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
