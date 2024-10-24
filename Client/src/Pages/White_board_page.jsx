import React, { useEffect } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import Logo from "../Components/Logo";
import styled from "styled-components";
import User from "../Components/Auth/User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const White_board_page = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/");
  });

  return (
    <Container>
      <Excalidraw
        initialData={{
          scrollToContent: true,
        }}
        gridModeEnabled={true}
        renderTopRightUI={() => (
          <div style={{ display: "flex", gap: "8px", marginRight: "12px" }}>
            <User />
          </div>
        )}
      >
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <Logo />
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>
              Nothing's New WhiteBoard!
            </WelcomeScreen.Center.Heading>
          </WelcomeScreen.Center>
        </WelcomeScreen>
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
      </Excalidraw>
    </Container>
  );
};

export default White_board_page;

const Container = styled.div`
  height: 100vh;
  .excalidraw {
    --color-primary: red;
  }
`;
