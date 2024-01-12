import React from 'react'
import { styled } from 'styled-components'

const Counter = (props) => {
  return (
    <Container>
      <div>{props.Post.followersCount} Followers</div>
      <div>{props.Post.followingsCount} Following</div>
      <div>{props.len} Post Published</div>
      
    </Container>
  )
}

export default Counter

const Container=styled.div`
    height: 100px;
    /* width: 200px;   */
    text-align:center;
    margin-top: 20px;
    background: white;
    border-radius: 20px;
    display: grid;
    /* gap: 10px; */
    /* justify-content: center; */
    align-items: center;
    padding: 20px;
    div{
      display: flex;
      justify-content: start;
    }
`