import { styled } from "styled-components";
import { TfiMoreAlt } from "react-icons/tfi";
import { useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Buttons = (props) => {
  
  const [report, setReport] = useState(false);
  const [click,setClicked]=useState(false);
  const auth=useAuth();
  const userref=useRef();
  
  let followingsArray=auth.user.following;
  console.log(followingsArray);
  const follow=()=>{
    setClicked(!click);
    // console.log(click);
    if(!click)
    {
      axios.put(`http://localhost:5010/follow?following=${props.userName}&follower=${auth.user.username}`)
      .then((res)=>{
        console.log(res.data.followings);
        userref.current.value="Following" 
        followingsArray=res.data.followings;
        
      })
      .catch((err)=>{
        console.log(err);
      })
    } 
  }
  // console.log(click);
  
  const vals=()=>{
    return followingsArray.find((e)=>(e===props.userName))
  }
  return (
    <Block>
      <Followbtn type="submit" ref={userref} value={vals()!==undefined?"Following":"Follow"} onClick={follow} clicks={click.toString()}></Followbtn>
      <div
        className="more"
        onClick={() => {
          setReport(!report);
        }}
      >
        <TfiMoreAlt />
      </div>
      <div className={report?"report":"report close"}>
        <input type="button" value="Report" />
      </div>
    </Block>
  );
};

export default Buttons;

const Block = styled.div`
  width: 95%;
  position: relative;
  top: -100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  .more {
    cursor: pointer;
  }
  .report {
    display: block;
    input[type="button"] {
      position: absolute;
      top: 45px;
      right: -60px;
      padding: 1.5% 8%;
      background: rgb(245, 245, 245);
      color: black;
    }
  }
  .close{
    display: none;
  }
`;

const Followbtn=styled.input`
  background:${({value})=> (value==="Follow"? "rgb(66, 99, 235)":"gray")};
  padding: 11px 15px;
  border: 0px;
  border-radius: 5px;
  margin-right: 5%;
  color: white;
  cursor: pointer;
  &:hover {
    background:${({value})=> (value!=="Follow"? "rgb(66, 99, 235)":"gray")};
  }
`