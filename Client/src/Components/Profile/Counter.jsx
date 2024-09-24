import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Loader } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import Main_user from "../Auth/Main_user";
import { resetFollowUsers } from "../../Redux/Slices/ProfileSlice";

const Counter = (props) => {
  const { followUsers } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickButtonName, setClickButtonName] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);

  const fetchFollower = () => {
    dispatch({
      type: "GET_FOLLOWER_USERS",
      data: {
        _id: props._id,
        page: followUsers.page,
        totalPages: followUsers.totalPages,
      },
    });
  };
  const fetchFollowing = () => {
    dispatch({
      type: "GET_FOLLOWING_USERS",
      data: {
        _id: props._id,
        page: followUsers.page,
        totalPages: followUsers.totalPages,
      },
    });
  };
  const onClickFollowHandler = (e) => {
    const val = e.target.textContent.split(" ")[1];
    setClickButtonName(val);
    dispatch(resetFollowUsers());
    setOpenDrawer(true);
    setTriggerFetch(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (triggerFetch) {
      if (clickButtonName === "Followers") {
        fetchFollower();
      } else if (clickButtonName === "Following") {
        fetchFollowing();
      }
      setTriggerFetch(false); // Reset the trigger
    }
  }, [triggerFetch, clickButtonName, dispatch]);

  return (
    <Container>
      <Drawer
        opened={openDrawer}
        onClose={closeDrawer}
        title={clickButtonName}
      >
        {followUsers.isGettingUsers ? (
          <Loading>
            <Loader color='blue' />
          </Loading>
        ) : followUsers.users.length === 0 ? (
          <h1 className='noData'>No {clickButtonName}</h1>
        ) : (
          <Main_user
            allUser={followUsers.users}
            fetchData={
              clickButtonName === "Followers" ? fetchFollower : fetchFollowing
            }
            hasmore={followUsers.more}
          />
        )}
      </Drawer>
      <div
        onClick={onClickFollowHandler}
        className='followListButton'
      >
        {props.followers.length} Followers
      </div>
      <div
        onClick={onClickFollowHandler}
        className='followListButton'
      >
        {props.followings.length} Following
      </div>
      <div>{props.posts.length} Post Published</div>
    </Container>
  );
};

export default Counter;

const Container = styled.div`
  height: 100px;
  grid-column: 2;
  grid-row: 2;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 10px 10px 24px rgba(0, 0, 0, 0.07);
  div {
    display: flex;
    justify-content: start;
  }
  .followListButton {
    cursor: pointer;
    &:hover {
      color: blue;
      text-decoration: underline;
    }
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
