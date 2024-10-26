import { styled } from "styled-components";
import Profile_pic from "./Profile_pic.jsx";
import Buttons from "./Buttons.jsx";
import Detail from "./Detail.jsx";
import { useSelector } from "react-redux";
import React from "react";

const Main_profile = (props) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return (
    <Conatiner>
      <Profile_pic {...props} />
      {user._id !== props._id && (
        <FollowButton>
          
          <Buttons {...props} />
        </FollowButton>
      )}
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
  border: 0.0625rem solid #dee2e6;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem;
`;

const FollowButton = styled.div`
  width: 95%;
  position: relative;
  top: -100px;
`;
