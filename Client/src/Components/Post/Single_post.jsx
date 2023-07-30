//has single post in the main_post
import { styled } from "styled-components";
import User_det from "./User_detail.jsx";
import Likes from "./Likes.jsx";
import Heading from "./Heading.jsx";
import { Link } from "react-router-dom";

const Single_post = () => {
  return (
    <Container>
      <Block>
        <User_det />
        <StyledLink to="/post">
          <Heading />
        </StyledLink>
        <div className="icons">
          <Likes />
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
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 2%;
  .heading {
    font-size: 1.8em;
    margin-left: 65px;
    padding: 15px 0px;
  }
  .icons {
    margin-left: 65px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
