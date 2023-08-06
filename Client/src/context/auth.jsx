import { createContext, useContext, useState } from "react";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [search,setSearch]=useState("");
    const login=(user)=>{
        setUser(user);
    }

    const logout=()=>{
        setUser(null);
    }
    
    const searching=(search)=>{
        setSearch(search);
    }
    return(
        <AuthContext.Provider value={{user,login,logout,searching,search}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}

