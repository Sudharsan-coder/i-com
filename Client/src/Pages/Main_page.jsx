
import Main_post from "../Components/Post/Main_post";
import { styled } from "styled-components";

const Main_page = () => {
  return (
    <>
      <Container>
        <Main_post />
      </Container>
    </>
  );
};

export default Main_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  overflow: hidden;
  grid-template-columns: 0.7fr 2fr 0.8fr;
  grid-row-gap: 50px;
`;
