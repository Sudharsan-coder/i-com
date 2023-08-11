import Log_in from "./Log_in_button.jsx";
import Logo from "../../assets/I_com_Logo_no_background.png";
import { styled } from "styled-components";
import { BsSearch } from "react-icons/Bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
const Nav_bar = () => {
  const auth = useAuth();
  console.log(auth.search);
  const navigate=useNavigate();
  return (
    <Container>
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="logo"/>
      </Link>
      <div className="search_bar">
        <input
          type="search"
          placeholder="Search..."
          value={auth.search}
          onChange={(e) => {
            auth.searching(e.target.value);
          }}
          onClick={()=>{
            navigate('/');
          }}
        ></input>
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
  z-index: 200;
  .logo {
    width: 75px;
    height: 75px;
  }
  input[type="search"] {
    height: 30px;
    margin-left: 10px;
    /* background-color:brown; */
    font-size: 1.1em;
    color: rgb(178, 178, 178);
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
