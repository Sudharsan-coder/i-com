import { styled } from 'styled-components'

const banner = () => {
  return (
    <Container>
    <div>banner</div>
    </Container>
  )
}

export default banner

const Container=styled.div`
    background: black;
    position: absolute;
    top:10vh;
    width: 100%;
    height:20vh;
`