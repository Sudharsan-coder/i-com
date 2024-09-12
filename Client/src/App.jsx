import Main_page from "./Pages/Main_page.jsx";
import Post_expand from "./Pages/Post_page_display.jsx";
import Profile from "./Pages/Profile_page.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProfile from "./Pages/EditProfile.jsx";
import Search from "./Pages/Search.jsx";
import { NothingFoundBackground } from "./Components/NothingFoundBackground.jsx";
import { useDispatch, useSelector } from "react-redux";
import Sign_in from "./Pages/Sign_in.jsx";
import Sign_up from "./Pages/Sign_up.jsx";
import Nav_bar from "./Components/Auth/Nav_bar.jsx";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import React from "react";
import ForgetPassword from "./Pages/ForgetPassword.jsx";

const MainLayout = () => (
  <>
    <Nav_bar />
    <Routes>
      <Route
        path='/'
        element={<Main_page/>}
      />
      <Route
        path='/profile/:id'
        element={<Profile />}
      />
      <Route
        path='/post/:id'
        element={<Post_expand />}
      />
      <Route
        path='/editprofile'
        element={<EditProfile />}
      />
      <Route
        path='/search'
        element={<Search />}
      />
      <Route
        path='*'
        element={<NothingFoundBackground />}
      />
    </Routes>
  </>
);
function App() {

  const {isAuth} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  useEffect(()=>{
  if(!isAuth){
    const token = Cookies.get('auth_Token')
    if(token){
      dispatch({type:"VALIDATE_USER",data:token})
    }
  }
  },[isAuth])
  return (
    
        <BrowserRouter>
          <Routes>
            <Route
              path='/sign_in'
              element={<Sign_in />}
            />
            <Route
              path='/sign_up'
              element={<Sign_up />}
            />
            <Route
              path='/forgetPassword'
              element={<ForgetPassword />}
            />
            <Route
              path='/*'
              element={<MainLayout />}
            />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
