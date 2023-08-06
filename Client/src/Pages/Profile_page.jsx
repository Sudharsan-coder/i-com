import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import Banner from "../Components/Profile/banner.jsx";
import Main_profile from "../Components/Profile/Main_profile.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
const Profile_page = () => {
const params=useParams();
const username=params.username;
const [profiledetails, setProfileDetails] = useState(null);
console.log(username);
useEffect(() => {
  axios
  .get(`http://localhost:5010/user?username=${username}`)
  .then((res) => {
    setProfileDetails(res.data);
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
}, []);
// console.log(profiledetails.userName);
  return (
    <Container>
      <Banner />
      {profiledetails && <Main_profile {...profiledetails}/>}
    </Container>
  );
};

export default Profile_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.3fr 2fr 0.3fr;
`;
