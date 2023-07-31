import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const PostContext=createContext(null);

export const PostProvider=({children})=>{

    const [post,setPost]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5010/post/AllPost')
        .then((res)=>{
            setPost(res.data);
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <PostContext.Provider value={{post}}>
            {children}
        </PostContext.Provider>
    )
}

export const useGetAllPost=()=>{
    return useContext(PostContext);
}