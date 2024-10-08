import { Avatar } from '@mantine/core'
import { styled } from 'styled-components'

const Profile_pic = (props) => {
  const handleRightClick = (e) => {
    e.preventDefault();
  };
  return (
  <Contianer onContextMenu={handleRightClick}>
    <Block src={props.profilePicUrl} size={100}>
      {props.userName[0]+props.userName[props.userName.length-1]}
    </Block>
  </Contianer>
  )
}
export default Profile_pic

const Contianer = styled.div `
  
`

const Block=styled(Avatar)`
    position: relative;
    top:-50px;
    margin: 0 auto;
    width: 110px;
    height: 110px;
    border-radius: 100%;
    border: 10px solid black;
    /* pointer-events: none; */
`