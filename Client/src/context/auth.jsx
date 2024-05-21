import { createContext, useContext, useState } from "react";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState({});
    const [showModel, setShowModel] = useState(true);
    const [search,setSearch]=useState();
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
        <AuthContext.Provider value={{user,login,logout,searching,search,profilePic,showModel,setShowModel}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}

