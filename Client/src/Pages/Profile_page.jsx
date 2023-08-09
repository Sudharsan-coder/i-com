import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Banner from "../Components/Profile/banner.jsx";
import Main_profile from "../Components/Profile/Main_profile.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Main_post from "../Components/Post/Main_post.jsx";
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

const [userpost,setuserpost]=useState([]);
useEffect(()=>{
    axios.get(`http://localhost:5010/post/UserPostFind?username=${username}`)
    .then((res)=>{
        setuserpost(res.data);
    })
    .catch((err)=>{
        console.log(err);
    })
},[])
console.log(userpost)
// console.log(profiledetails.userName);
  return (
    <Container>
      <Banner />
      {profiledetails && <Main_profile {...profiledetails}/>}
      {userpost && <Main_post Post={userpost}/>}
    </Container>
  );
};

export default Profile_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.3fr 2fr 0.3fr;
`;
