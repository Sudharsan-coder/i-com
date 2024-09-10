import parse from 'html-react-parser';
import React from 'react';
import styled from 'styled-components';

const Content = (props) => {
  const val=props.content
  return (
    <Container>
      {parse(val)}
    </Container>
  )
}
export default Content

const Container = styled.div `
  pre{
    background-color: #1f1f1f;
    color: aliceblue;
    padding: 5px;
    border-radius: 5px;
  }
  a{
    color: blue;
  }
`