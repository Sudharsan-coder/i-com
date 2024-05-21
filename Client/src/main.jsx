import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Main_page from "./Pages/Main_page.jsx";
import Post_expand from "./Pages/Post_page_display.jsx";
import Profile from "./Pages/Profile_page.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import EditProfile from "./Pages/EditProfile.jsx";
import Search from "./Pages/Search.jsx";
import { NothingFoundBackground } from "./Components/NothingFoundBackground.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
      <Routes>
        <Route exact path="/" element={<Main_page />}></Route>
        <Route exact path="/profile/:id" element={<Profile />}></Route>
        <Route exact path="/post/:id" element={<Post_expand />}></Route>
        <Route exact path="/editprofile" element={<EditProfile />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        {/* <Route exact path="/post/upload" element={<Create_post />}></Route> */}
        <Route path="*" element={<NothingFoundBackground/>}></Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
