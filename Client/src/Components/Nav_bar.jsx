import Log_in from "./Log_in_button.jsx";
import Logo from "../assets/I_com_Logo_no_background.png";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/Bs";
import { Link } from "react-router-dom";
const Nav_bar = () => {
  return (
    <Container>
      <Link to={"/"}>
        <img src={Logo} alt="logo" />
      </Link>
      <div className="search_bar">
        <input type="search" placeholder="Search..."></input>
        <S_Icon>
          <BsSearch size={20} />
        </S_Icon>
      </div>
      <Log_in />
    </Container>
  );
};
export default Nav_bar;
const Container = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  img {
    width: 75px;
    height: 75px;
  }
  input[type="search"] {
    height: 30px;
    margin-left: 10px;
    /* background-color:brown; */
    font-size: 1.1em;
    color:rgb(178, 178, 178);
    width: 95%;
    outline: none;
    border: none;
  }
  .search_bar {
    border: 2px solid rgb(178, 178, 178);
    background: white;
    padding: 2px;
    width: 40%;
    height: 45%;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
`;
const S_Icon = styled.div`
  padding: 3px;
  border-radius: 5px;
  &:hover {
    background: rgb(235, 236, 252);
  }
`;
