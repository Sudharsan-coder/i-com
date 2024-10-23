import { Card, Text } from "@mantine/core";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineDone } from "react-icons/md";


const Your_activity_menus = () => {

  return (
    <Container>
      <FirstCard
        withBorder
        shadow='sm'
      >
        <NavLink
          to='/your_activity/likedPost'
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <LinkName>
              <Text>Liked Blogs</Text>
              {isActive && (
                <MdOutlineDone
                  size={30}
                  className={isActive ? "active-icon" : ""}
                />
              )}
            </LinkName>
          )}
        </NavLink>

        <NavLink
          to={"/your_activity/savedPost"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <LinkName>
              <Text>Saved Blogs</Text>
              {isActive && (
                <MdOutlineDone
                  size={30}
                  className={isActive ? "active-icon" : ""}
                />
              )}
            </LinkName>
          )}
        </NavLink>
        <NavLink
          to={"/your_activity/commentedPost"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {({ isActive }) => (
            <LinkName>
              <Text>Commented Blogs</Text>
              {isActive && (
                <MdOutlineDone
                  size={30}
                  className={isActive ? "active-icon" : ""}
                />
              )}
            </LinkName>
          )}
        </NavLink>
      </FirstCard>
    </Container>
  );
};

export default Your_activity_menus;

const Container = styled.div`
  grid-column: 1;
`;
const FirstCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  a {
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid gray;
    border-radius: 3px;
    &:hover {
      color: var(--primary_color);
      background-color: var(--secondary_color);
      border: 1px solid var(--primary_color);
    }
  }
  .active {
    color: var(--primary_color);
    background-color: var(--secondary_color);
    border-bottom: 1px solid var(--primary_color);
  }
  .active-icon {
    color: var(--primary_color);
  }
`;
const LinkName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
`;
