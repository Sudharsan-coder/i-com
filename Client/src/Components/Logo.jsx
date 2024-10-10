import React from 'react'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Container>
      <Nothing>Nothing's</Nothing>
      <New> New</New>
      {/* <Icom>The Community</Icom> */}
    </Container>
  )
}

export default Logo

const Container = styled.div `
`
const Nothing = styled.span `
/* outline: red; */
border: 1px solid white;
box-shadow: 0 0 0 1px var(--primary_color);
background-color: var(--primary_color);
color: aliceblue;
border-radius: 5px;
padding: 5px;
font-family: "Sofadi One", system-ui;
    
`
const New = styled.span`
    color: black !important;
`
const Icom = styled.p `
  font-size: 15px;
`