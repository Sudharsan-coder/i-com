import {
  Avatar,
  Box,
  Input,
  Loader,
  MultiSelect,
  PasswordInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconAlertCircleFilled, IconDiscountCheckFilled } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth } from "../context/auth";

const EditProfile = () => {
  const [profiledetails, setProfileDetails] = useState(null);
  const auth=useAuth();
  
  
  useEffect(() => {
    axios
      .get(`http://localhost:5010/user?username=${auth.user.username}`)
      .then((res) => {
        setProfileDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setProfileDetails(null)
      });
  }, [auth.user.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profiledetails, [name]: value });
    console.log(profiledetails)
  };

  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  const imagetobase64 = (e) => {
    var read = new FileReader();
    read.readAsDataURL(e.target.files[0]);
    read.onload = () => {
      setProfileDetails({ ...profiledetails, profilePicUrl: read.result });
    };
    read.onerror = (err) => {
      console.log(err);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    notifications.show({
      id: 'load-data',
      loading: true,
      title: 'Loading your data',
      message: 'Data will be loaded in 3 seconds, you cannot close this yet',
      autoClose: false,
      withCloseButton: false,
    });
    console.log(profiledetails._id)
    axios
      .put(`http://localhost:5010/user/${profiledetails._id}`,profiledetails)
      .then((res) => {
      
        console.log(res.data[0].profilePicUrl);
        notifications.update({
          id: 'load-data',
          title: "Updated Successfully",
          message: "Your profile is updated",
          color: "green",
          icon: (
            <IconDiscountCheckFilled
              color='green'
              size='3rem'
            />
          ),
        });
       auth.profilePic(res.data[0].profilePicUrl)
     
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          title: "Something went wrong",
          message: "Your profile is not updated",
          color: "red",
          icon: (
            <IconAlertCircleFilled
              color='red'
              size='3rem'
            />
          ),
        });
      });
  };

  return (
    <Container>
      {profiledetails ? (
        <Form onSubmit={handleSubmit}>
        
            <Boxs
              bg={"white"}
              p={30}
              w={380}
            >
              <Title order={1}>User</Title>
              <Name>
                <Input.Wrapper
                  label='First Name'
                  withAsterisk
                >
                  <Input
                    placeholder='Your First Name'
                    radius='md'
                    value={profiledetails.firstName}
                    onChange={handleChange}
                    name='firstName'
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  label='Last Name'
                  withAsterisk
                >
                  <Input
                    placeholder='Your Last Name'
                    radius='md'
                    value={profiledetails.lastName}
                    onChange={handleChange}
                    name='lastName'
                  />
                </Input.Wrapper>
              </Name>
              <Input.Wrapper
                label='Username'
                withAsterisk
              >
                <Input
                  placeholder='Username'
                  radius='md'
                  value={profiledetails.userName}
                  disabled
                />
              </Input.Wrapper>
              <Input.Wrapper
                label='Email ID'
              >
                <Input
                  placeholder='Email id'
                  radius='md'
                  value={profiledetails.emailId}
                  onChange={handleChange}
                  name='emailId'
                />
              </Input.Wrapper>
              <Input.Wrapper
                label='Password'
                withAsterisk
              >
                <PasswordInput
                  placeholder='Create new password'
                  radius='md'
                  value={profiledetails.hashedPassword}
                  onChange={handleChange}
                  name='hashedPassword'
                />
              </Input.Wrapper>
              <Input.Wrapper label='Profile Image'>
                <Profile>
                  <Avatar
                    src={profiledetails.profilePicUrl}
                    alt="it's me"
                  />
                  <input
                    type='file'
                    id='images'
                    accept='image/*'
                    onChange={imagetobase64}
                  />
                </Profile>
              </Input.Wrapper>
            </Boxs>

            <Boxs
              bg={"white"}
              p={30}
              w={380}
            >
              <Title order={1}>Personal Information</Title>
              <Input.Wrapper
                label='Location'
                withAsterisk
              >
                <Input
                  placeholder='India, TamilNadu, Chennai'
                  radius='md'
                  value={profiledetails.location}
                  onChange={handleChange}
                  name='location'
                />
              </Input.Wrapper>

              <Textarea
                label='Bio'
                placeholder='A short bio'
                autosize
                minRows={2}
                maxRows={4}
                name="userBio"
                value={profiledetails.userBio}
                onChange={handleChange}
              />

              <DateInput
                valueFormat='YYYY MMM DD'
                label='Date Of Birth'
                placeholder='DOB'
                value={profiledetails.DOB}
                name='DOB'
                onChange={setProfileDetails}
              />

              <MultiSelect
                label='Skills'
                data={data}
                placeholder='Add Skills'
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  setData((current) => [...current, item]);
                  return item;
                }}
                onChange={(value) => {
                  setProfileDetails({ ...profiledetails, skills: value });
                }}
              />
            </Boxs>

            <Boxs
              bg={"white"}
              p={30}
              w={380}
              mb={20}
            >
              <SubmitBtn
                type='submit'
                value='Save Information'
              />
            </Boxs>
         
        </Form>
      ) : (
        <Loading variant='bars' />
      )}
    </Container>
  );
};

export default EditProfile;

const Container = styled.div`
  margin-top: 15vh;
  display: grid;
  grid-template-columns: 0.6fr 2fr 0.6fr;
  justify-items: center;
`;
const Form = styled.form`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Name = styled.div`
  display: flex;
  gap: 20px;
`;

const Boxs = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const SubmitBtn = styled.input`
  background-color: #4263eb;
  color: white;
  border: none;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
`;

const Loading = styled(Loader)`
  grid-column: 2;
`;