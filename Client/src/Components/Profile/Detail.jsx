import {GrLocation} from 'react-icons/gr'
import {LiaBirthdayCakeSolid} from 'react-icons/lia'
import {FiMail} from 'react-icons/fi'
import { styled } from 'styled-components'
import { useAuth } from '../../context/auth'


const Detail = (props) => {
console.log(props.userName);
const auth=useAuth();

  return (
    <Block>
    <div className="name">{props.userName}</div>
    <div className="about">
        {props.userBio ? props.userBio :(auth.user.username==props.userName?"Update your Profile":"Bio is not Updated")}
    </div>
    <div className="details">
       { <GrLocation size="25px"/> &&
        props.location}
        {<LiaBirthdayCakeSolid size="25px"/> &&
        props.DOB}
        <FiMail size="25px"/>
        {props.emailId}
    </div>
        {/* <Main_post Post={userpost}/> */}
    </Block>
  )
}

export default Detail

const Block=styled.div`
position: relative;
top: -50px;
    width: 100%;
    padding: 0px 10%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 25px;
    .name{
        font-size: 1.5em;
        font-weight: 1000;
    }
    .details{
        display: flex;
        justify-content: space-around;
        gap:20px;
        align-items:center;
        width:fit-content;
    }
`