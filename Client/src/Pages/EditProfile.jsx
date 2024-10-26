import {
  Avatar,
  Box,
  Button,
  Input,
  Loader,
  Modal,
  MultiSelect,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Change_pic from "../Components/Profile/Change_pic";
import {
  picUpdatingModal,
  resetChangedPicUrl,
} from "../Redux/Slices/authSlice";

const EditProfile = () => {
  const { user, isAuth, isChangingPicUrl, changedPicUrl } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profiledetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailId: "",
    userBio: "",
    location: "",
    DOB: "",
    skills: [],
    profilePicUrl: "",
  });

  useEffect(() => {
    dispatch(resetChangedPicUrl());
  }, []);

  useEffect(() => {
    if (!isAuth) navigate("/sign_in");
    setProfileDetails(user);
  }, [user._id]);

  useEffect(() => {
    if (changedPicUrl) {
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        profilePicUrl: changedPicUrl,
      }));
    }
  }, [changedPicUrl]);

  const openUpdatingProfilePicModal = () => {
    dispatch(picUpdatingModal(true));
  };

  const closeUpdatingProfilePicModal = () => {
    dispatch(picUpdatingModal(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profiledetails, [name]: value });
  };

  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PROFILE",
      data: { profiledetails, _id: user._id },
    });
  };

  return (
    <Container>
      <Modal
        opened={isChangingPicUrl}
        onClose={closeUpdatingProfilePicModal}
        title='Change Profile Picture'
      >
        <Change_pic />
      </Modal>
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
              name='UserName'
              value={profiledetails.userName}
              disabled
            />
          </Input.Wrapper>
          <Input.Wrapper
            label='Email ID'
            withAsterisk
          >
            <Input
              placeholder='Email id'
              radius='md'
              value={profiledetails.emailId}
              onChange={handleChange}
              name='emailId'
            />
          </Input.Wrapper>
          <Input.Wrapper label='Profile Image'>
            <Profile>
              <Avatar
                color='blue'
                src={profiledetails.profilePicUrl}
                alt="it's me"
                size={100}
              />

              <Button onClick={openUpdatingProfilePicModal}>
                Change Profile
              </Button>
            </Profile>
          </Input.Wrapper>
        </Boxs>

        <Boxs
          bg={"white"}
          p={30}
          w={380}
        >
          <Title order={1}>Personal Information</Title>
          <Input.Wrapper label='Location'>
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
            name='userBio'
            value={profiledetails.userBio}
            onChange={handleChange}
          />

          <DateInput
            valueFormat='YYYY MMM DD'
            label='Date Of Birth'
            placeholder='DOB'
            value={profiledetails.DOB ? new Date(profiledetails.DOB) : null}
            name='DOB'
            onChange={(val) => {
              setProfileDetails({
                ...profiledetails,
                DOB: val?.toDateString() || "",
              });
            }}
          />

          <MultiSelect
            label='Skills'
            data={data}
            placeholder='Add Skills'
            searchable
            creatable
            name='skills'
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
      {/* {isProfileUpdating ? ( <Loading variant='bars' />): (
      )} */}
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
