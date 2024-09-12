import { useState } from "react";
import { styled } from "styled-components";
import { Input, LoadingOverlay, MultiSelect } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Content from "./Content";
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

const Post_create_box = () => {
  const { isCreatingPost } = useSelector((state) => state.publicPosts);
  const dispatch = useDispatch();
  const [postUpload, setPostUpload] = useState({
    title: "",
    content: "",
    tags: [],
    bannerPic: "",
  });

  const { tags, ...others } = postUpload;

  const imagetobase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPostUpload({
        ...postUpload,
        bannerPic: typeof reader.result === "string" ? reader.result : "",
      });
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };

  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostUpload({ ...postUpload, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "CREATE_POST", data: postUpload });
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const module = {
    // syntax: {
    //   highlight: (text) => Prism.highlight(text, Prism.languages.javascript, 'javascript'),
    // },
    toolbar: toolbarOptions,
  };

  return (
    <Container>
      <Left>
        <LoadingOverlay visible={isCreatingPost} overlayBlur={2} />
        <BOX onSubmit={handleSubmit}>
          <label>Banner Picture</label>
          <input
            type='file'
            id='images'
            accept='image/*'
            onChange={imagetobase64}
          />
          <label>Title</label>
          <Input
            className='title'
            placeholder='Title of the Your Post'
            type='text'
            value={postUpload.title}
            name='title'
            onChange={handleChange}
            required
          />
          <label>Tags</label>
          <MultiSelect
            data={data}
            placeholder='Select Tags'
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setData((current) => [...current, item]);
              return item;
            }}
            size='md'
            rightSectionWidth={1}
            maxDropdownHeight={160}
            onChange={(value) => {
              setPostUpload({ ...postUpload, tags: value });
            }}
          />
          <label>Description</label>
          <ReactQuill
            className='post_content'
            theme='snow'
            modules={module}
            value={postUpload.content}
            onChange={(e) => setPostUpload({ ...postUpload, content: e })}
          />
          <input className='submit' type='submit' value='Publish' />
        </BOX>
      </Left>
      <Right>
      <h1>Description Preview</h1>
        <Content {...postUpload} />
      </Right>
    </Container>
  );
};

export default Post_create_box;

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: calc(100vh - 10vh);
  padding: 10px;
  box-sizing: border-box;
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;

const BOX = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .post_content {
    flex: 1;
  }
  .ql-editor{
    /* background-color: red; */
    min-height: 200px;
  }

  .submit {
    margin: 0px auto;
    background: blue;
    border: 0px;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    &:hover{
      background: #5f5ff0;
    }
  }
`;

const Right = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;
