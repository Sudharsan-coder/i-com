import React from 'react'
import { styled } from 'styled-components'

const Counter = (props) => {
  return (
    <Container>
      <div>{props.followers.length} Followers</div>
      <div>{props.followings.length} Following</div>
      <div>{props.posts.length} Post Published</div>
      
    </Container>
  )
}

export default Counter

const Container=styled.div`
    height: 100px;
    grid-column: 2;
    grid-row: 2;
    margin-top: 20px;
    background: white;
    border-radius: 20px;
    padding: 20px;
    font-size: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    div{
      display: flex;
      justify-content: start;
    }
`