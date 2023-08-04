import React from "react";
import Banner from "../Profile/banner.jsx";
import logo from "../../assets/logo.png";
import { styled } from "styled-components";

function AsideProfile() {
  return (
    <>
    <Container>
      <Flo>
        <img src={logo} alt="" width={"20%"} height={"20%"} />
        <h2>Sudharsan</h2>
      </Flo>
      <button>Follow</button>

      <div className="descrip">
        <p style={{fontWeight:"500"}}>Software Engineer | Creator | Open Web Advocate </p>
      </div>

      <div className="loc">
        <span style={{ fontSize: "20px"}}>
          <b>Location</b>
        </span>
        <span style={{marginTop:"3px"}}>Brazil</span> <br />
        <span style={{ fontSize: "20px"}}>
          <b>Joined</b>
        </span>
        <span style={{marginTop:"1px"}}>sep 19</span>
      </div>
    </Container>
    <post>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id commodi culpa voluptatum quasi consequatur aliquid asperiores eius facere magni aut ad nesciunt, error pariatur, corporis mollitia aliquam, sunt saepe. Dolores?</p>
    </post>
    </>
  );
}

export default AsideProfile;

const Container = styled.div`
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
  margin: 2rem 0 0 30%;
  width: fit-content;
  padding: 20px;
  border-radius: 20px;
  .loc span {
    display: block;
  }

  button {
    padding: 0.7rem 4rem;
    align-self: center;
    width: 80%;
    margin-bottom: 1rem;
    color: white;
    background-color: #3b49df;
    font-size: 15px;
    border-radius: 5px;
  }
`;

const Flo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    border-radius: 50%;
    margin-right: 5px;
  }
`;
const post = styled.div`
  height: 20px;
  width: 100%;
  background-color: lightblue;
`;
