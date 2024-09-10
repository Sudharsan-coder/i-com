import { styled } from "styled-components";
import Profile_pic from "./Profile_pic.jsx";
import Buttons from "./Buttons.jsx";
import Detail from "./Detail.jsx";
import { useSelector } from "react-redux";

const Main_profile = (props) => {
const {isAuth,user} = useSelector((state)=>state.auth)
  return (
    <Conatiner>
      <Profile_pic {...props} />
      {(user._id!==props._id) && <Buttons {...props} />}
      <Detail {...props} />
    </Conatiner>
  );
};

export default Main_profile;

const Conatiner = styled.div`
  background: white;
  grid-column-start: 2;
  grid-column-end: 4;
  z-index: 2;
  margin-top: 10vh;
  border-radius: 10px;
`;
