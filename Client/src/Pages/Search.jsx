import { Tabs } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { styled } from "styled-components";
import { useEffect } from "react";
import Main_post from "../Components/Post/Main_post";
import MainpageLoading from "../Components/Loading/MainpageLoading";
import { IconUser } from "@tabler/icons-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Main_user from "../Components/Auth/Main_user";
import { resetSearch } from "../Redux/Slices/searchSlice";
import { useSearchParams } from "react-router-dom";
const Search = () => {
  const dispatch = useDispatch();
  const {
    isGettingSearchPost,
    isGettingSearchUser,
    searchPosts,
    searchUsers,
    searchPostPage,
    searchPostTotalPages,
    searchUserPage,
    searchUserTotalPages,
    usermore,
    postmore,
  } = useSelector((state) => state.search);
  const { isAuth } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");

  useEffect(() => {
    dispatch(resetSearch());
  }, [search,tag]);
  
  useEffect(() => {
    if (searchPostPage === 1 && searchUserPage === 1) {
      fetchPost();
      fetchUser();
    }
  }, [search,searchPostPage,tag]);

  const fetchUser = () => {
    dispatch({
      type: "GET_SEARCH_USER",
      data: {
        value: search,
        page: searchUserPage,
        totalPages: searchUserTotalPages,
      },
    });
  };

  const fetchPost = () => {
    dispatch({
      type: "GET_SEARCH_POST",
      data: {
        value: search,
        tag,
        page: searchPostPage,
        totalPages: searchPostTotalPages,
      },
    });
  };

  return (
    <Container>
      <Tabs
        defaultValue='gallery'
        className='DS'
      >
        <Tabs.List grow>
          <Tabs.Tab
            value='gallery'
            icon={<IconPhoto size='0.8rem' />}
          >
            Blogs
          </Tabs.Tab>
          <Tabs.Tab
            value='messages'
            icon={<IconUser size='0.8rem' />}
          >
            Users
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          value='gallery'
          pt='xs'
        >
          {isGettingSearchPost ? (
            <MainpageLoading />
          ) : searchPosts.length !== 0 ? (
            <Main_post
              allPost={searchPosts}
              fetchData={fetchPost}
              hasmore={postmore}
            />
          ) : (
            <h1>No Result</h1>
          )}
        </Tabs.Panel>

        <Tabs.Panel
          value='messages'
          pt='xs'
        >
          {isGettingSearchUser ? (
            <MainpageLoading />
          ) : searchUsers.length !== 0 ? (
            <Main_user
              allUser={searchUsers}
              fetchData={fetchUser}
              hasmore={usermore}
            />
          ) : (
            <h1>No Result</h1>
          )}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-template-columns: 0.7fr 2fr 0.8fr;
  grid-row-gap: 50px;
  .DS {
    grid-column: 2;
    margin-top: 40px;
  }
`;
