import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Banner from "../Components/Profile/Banner.jsx";
import Main_profile from "../Components/Profile/Main_profile.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Main_post from "../Components/Post/Main_post.jsx";
import Counter from "../Components/Profile/Counter.jsx";
import ProfilepageLoading from "../Components/Loading/ProfilepageLoading.jsx";
import LoadingSkeleton from "../Components/Loading/LoadingSkeleton.jsx";
import MainpageLoading from "../Components/Loading/MainpageLoading.jsx";
const Profile_page = () => {
  const params = useParams();
  const username = params.username;
  const [profiledetails, setProfileDetails] = useState(null);
  console.log(username);

  const [Loading1, setLoading1] = useState(true);
  const [Loading2, setLoading2] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5010/user?username=${username}`)
      .then((res) => {
        setProfileDetails(res.data);
        console.log(res.data);
        setLoading1(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  const [userpost, setuserpost] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5010/post/UserPostFind?username=${username}`)
      .then((res) => {
        setuserpost(res.data);
        setLoading2(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);
  console.log(userpost);
  // console.log(profiledetails.userName);
  return (
    <Container>
      <Banner />
      {Loading1 ? (
        <ProfilepageLoading />
      ) : (
        profiledetails && <Main_profile {...profiledetails} />
      )}

      <Content>
        {profiledetails && userpost && (
          <Counter
            Post={profiledetails}
            len={userpost.length}
          />
        )}
        {Loading2 ? (
          <MainpageLoading />
        ) : (
          userpost && <Main_post Post={userpost} />
        )}
      </Content>
    </Container>
  );
};

export default Profile_page;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.6fr 2fr 0.6fr;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  grid-column: 2;
`;
