import React from 'react'
import styled from 'styled-components'

const AuthenticationLoading = () => {
  return (
    <Container>
      <p>Authenticating...</p>
    </Container>
  )
}

export default AuthenticationLoading

const Container = styled.div`
    background-color: var(--primary_color);
    color: aliceblue;
`