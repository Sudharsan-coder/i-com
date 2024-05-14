import { styled } from "styled-components";
import Profile_pic from "./Profile_pic.jsx";
import Buttons from "./Buttons.jsx";
import Detail from "./Detail.jsx";
import { useAuth } from "../../context/auth.jsx";

const Main_profile = (props) => {
console.log(props.userName);
const auth=useAuth();
  return (
    <Conatiner>
      <Profile_pic {...props} />
      {/* {(auth.user.username!==props.userName) && <Buttons {...props} />} */}
      <Detail {...props} />
    </Conatiner>
  );
};

export default Main_profile;

const Conatiner = styled.div`
  background: white;
  grid-column: 2;
  
  z-index: 2;
  margin-top: 10vh;
  border-radius: 10px;
`;
