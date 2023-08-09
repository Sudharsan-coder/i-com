import pic from '../../assets/I_com_Logo.png'
import { styled } from 'styled-components'

const Profile_pic = (props) => {
  return (
    <Block profile={props.profilePicUrl}>
    </Block>
  )
}
export default Profile_pic

const Block=styled.div`
    position: relative;
    top:-50px;
    margin: 0 auto;
    width: 110px;
    height: 110px;
    border-radius: 100%;
    border: 10px solid black;
    background-image:url( ${({profile})=>(profile)});
    background-size: cover;
`