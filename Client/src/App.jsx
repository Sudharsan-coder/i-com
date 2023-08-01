import { useState } from "react";
import Nav_bar from "./Components/Nav_bar.jsx";
// import Post_create_box from "./Components/Post_create/Post_create_box.jsx";
function App() {
  const [show,setShow]=useState(true);
  return (
    <>
      <Nav_bar />
      {/* {show && <Post_create_box setShow={setShow}/>} */}
    </>
  );
}

export default App;
