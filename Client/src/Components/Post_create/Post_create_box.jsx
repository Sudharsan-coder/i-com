import React, { createContext, useState } from "react";
import { render } from "react-dom";
import { styled } from "styled-components";
// import Content from "./Content";
import { Link } from "react-router-dom";

// export const Post_content=createContext();

const Post_create_box = (prop) => {
    let [tags, setTags] = useState([]);
    function add_tag() {
        const tag = document.querySelector(".add_tag");
        let arr=[...tags];
        arr.push(<div className="single_tag" key={tag.value}>#{tag.value}</div>);
        setTags(arr);
        tag.value = ""
    }
    return (
        <div className="fullscreen center">
            <Container>
                <label>Title</label>
                <input
                    className="title"
                    placeholder="title"
                    type="text"
                ></input>
                <label>Tags</label>
                <div className="tag_container">
                    <div className="tags">{
                    tags
                    }</div>
                    <input
                        className="add_tag"
                        placeholder="tag"
                        type="text"
                    ></input>
                    <input onClick={add_tag} type="button" value="Add" />
                </div>
                <label>Description</label>
                <textarea className='post_context' placeholder="provide in markup language"></textarea>
                <input className="submit" type="button" value="Post" onClick={()=>{localStorage.setItem("post_des", document.querySelector('.post_context').value);prop.setShow(false)}} />
            </Container>
        </div>
    );
};

export default Post_create_box;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgb(227, 226, 226);
    padding: 1.5% 5%;
    border-radius: 5px;
    input {
        width: 500px;
    }
    .add_tag {
        width: 200px;
    }
    textarea {
        width: 500px;
        height: 250px;
    }
    .tag_container {
        input[type="button"] {
            width: fit-content;
            margin-left: 20px;
        }
    }
    .tags {
        height: fit-content;
        width: 500px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .single_tag {
            background-color: aliceblue;
        }
    }
    .submit {
        width: fit-content;
        margin: 0px auto;
        background: blue;
        border: 0px;
        border-radius: 5px;
        padding: 1.5% 3.5%;
        color: white;
    }
`;
