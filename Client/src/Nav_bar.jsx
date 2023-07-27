import React from 'react'
import Log_in from "./Components/Log_in_button.jsx" 
import Logo from "./assets/logo.png"
import { styled } from 'styled-components'
import {BsSearch} from "react-icons/Bs"
const Nav_bar=()=>{
  return (
    <Container>
        <img src={Logo} alt='pic'/>
        <div className='search_bar'>
        <input type='search' ></input>
        <S_Icon><BsSearch size={20}/></S_Icon>
        </div>
        <Log_in/>
    </Container>
  )
}
export default Nav_bar  
const Container=styled.div`
    background:red;
    position:fixed;
    top:0px;
    width:100vw;
    height:10vh;
    display:flex;
    justify-content:space-around;
    align-items:center;
    img{
        width:55px;
        height:50px;
    }
    input[type="search"]{
      height:100%;
        width:95%;
        outline:none;
        border:none;
    }
    .search_bar{
      border:2px solid black;
      background:white;
      padding:2px;
      width:40%;
      height:45%;
      border-radius:10px;
      display:flex;
      align-items:center;
    }
`
const S_Icon=styled.div`
    padding:3px;
    border-radius:5px;
    &:hover{
    background:rgb(235, 236, 252);
    }
`