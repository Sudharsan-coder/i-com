import React, { useEffect, useState } from "react";
import {
  Popover,
  Input,
  CloseButton,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import UserCardLoading from "../Loading/UserCardLoading";
import { resetSearch } from "../../Redux/Slices/searchSlice";
import styled from "styled-components";
import Chats from "./Chats";
const Search_box = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const {
    isGettingSearchUser,
    searchUsers,
    searchUserPage,
    searchUserTotalPages,
    usermore,
  } = useSelector((state) => state.search);
  
  useEffect(() => {
    dispatch(resetSearch());
  }, [value]);
  
  useEffect(() => {
    if (searchUserPage === 1) {
      fetchUser();
    }
  }, [value,searchUserPage]);
  
  const fetchUser = () => {
    dispatch({
      type: "GET_SEARCH_USER",
      data: {
        value: value,
        page: searchUserPage,
        totalPages: searchUserTotalPages,
      },
    });
  };
  return (
    <>
      <Popover
        width={400}
        position='bottom'
        shadow='md'
      >
        <Popover.Target>
          <Input
            placeholder='Search user'
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            mt='md'
            rightSection={
              <CloseButton
                aria-label='Search'
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
          />
        </Popover.Target>
        <Popover.Dropdown>
          <UserBox id='scrollableDiv'>
          {isGettingSearchUser ? (
            <UserCardLoading />
          ) : searchUsers.length !== 0 ? (
            <Chats
              allUser={searchUsers}
              fetchData={fetchUser}
              hasmore={usermore}
            />
          ) : (
            <h1>No found</h1>
          )}
          </UserBox>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default Search_box;

const UserBox = styled.div`
    height: 400px;
    overflow: auto;
    font-size: 12;
`