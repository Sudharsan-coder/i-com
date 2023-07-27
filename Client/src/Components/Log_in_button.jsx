import React from 'react'
import { styled } from 'styled-components'

const Log_in_button = () => {
  return (
    <Container>
    <input type='button' value="Log_in"></input>
    </Container>
  )
}

export default Log_in_button

const Container=styled.div`
  input{
    width:fit-content ;
    padding:5px 7px;
    background:yellow;
    border:0px;
    border-radius:5px;
    &:hover{
      transform:scale(1.1);
    }
  }
`