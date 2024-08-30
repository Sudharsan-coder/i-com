import { Modal } from "@mantine/core";
import { createContext, useContext, useState } from "react";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import styled from "styled-components";
import { useDisclosure } from "@mantine/hooks";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState({});
    const [showModel, setShowModel] = useState(true);
    const [search,setSearch]=useState();
    const [post, setPost] = useState({});
    const [opened, modelOC] = useDisclosure(false);
    const [dis, setdis] = useState(false);
    const login=(user)=>{
        setUser({...user});
    }

    const logout=()=>{
        setUser({});
    }
    
    const searching=(search)=>{
        setSearch(search);
    }
    
    const profilePic=(profile)=>{
        setUser({...user,profile})
    }
    return(
        <AuthContext.Provider value={{user,login,logout,searching,search,profilePic,showModel,setShowModel,modelOC,post,setPost}}>
            {showModel && (
            <Modal
              opened={opened}
              onClose={modelOC.close}
              title='Authentication'
              centered
            >
              {dis ? (
                <Login close={setShowModel} />
              ) : (
                <Register close={setShowModel} />
              )}
              <Navbtn onClick={() => setdis((prev) => (prev ? false : true))}>
                {dis ? (
                  <label>Don&acute;t have an account? Register</label>
                ) : (
                  <label>Have an account? Login</label>
                )}
              </Navbtn>
            </Modal>
          )}
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}

const Navbtn = styled.button`
  all: unset;
  font-size: 12px;
  &:hover {
    text-decoration: underline blueviolet;
  }
`;