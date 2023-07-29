import React from 'react'
import { styled } from 'styled-components'

const Log_in_button = () => {
  return (
    <Container>
    <input type='button' value="Log in"></input>
    <input className="create" type='button' value="Create account"></input>
    </Container>
  )
}

export default Log_in_button

const Container=styled.div`
    /* display: flex;
    justify-items: space-around;
    width:200px;
    background: black; */
  input{
    width:fit-content ;
    padding:5px 7px;
    background: transparent;
    border:0px;
    border-radius:5px;
    margin-right: 20px;
    font-size: large;
    &:hover{
      transform:scale(1.05);
      background: rgb(235, 236, 252);
      text-decoration: underline;
      text-decoration-color:blue;
    }
  }
  .create{
    border: 2px solid rgb(178, 178, 178);
    padding: 10px;
    &:hover{
      border: 2px solid blue;
      text-decoration: none;
    }
  }
`