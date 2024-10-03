import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  Avatar,
  Button,
  Input,
  LoadingOverlay,
  Modal,
  MultiSelect,
} from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Content from "./Content";
import { setCreatePost } from "../../Redux/Slices/publicPostsSlice";
import { picUpdatingModal } from "../../Redux/Slices/authSlice";
import Change_pic from "../Profile/Change_pic";

const Post_create_box = () => {
  const { isCreatingPost, postModelType, createPost } = useSelector(
    (state) => state.publicPosts
  );
  const { user, isChangingPicUrl, changedPicUrl } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (changedPicUrl) {
      dispatch(setCreatePost({...createPost,bannerPic:changedPicUrl}));
    }
  }, [changedPicUrl]);

  const openUpdatingBannerPicModal = () => {
    dispatch(picUpdatingModal(true));
  };

  const closeUpdatingBannerPicModal = () => {
    dispatch(picUpdatingModal(false));
  };

  const [data, setData] = useState([
    "React",
    "Angular",
    "Vue",
    "Svelte",
    ...createPost.tags,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCreatePost({ ...createPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postModelType === "CREATE_POST")
      dispatch({ type: "CREATE_POST", data: createPost });
    else if (postModelType === "EDIT_POST")
      dispatch({ type: "EDIT_POST", data: { _id: user._id, createPost } });
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
      <Modal
        opened={isChangingPicUrl}
        onClose={closeUpdatingBannerPicModal}
        title='Change Banner Picture'
      >
        <Change_pic />
      </Modal>
      <Left>
        <LoadingOverlay
          visible={isCreatingPost}
          overlayBlur={2}
        />
        <BOX onSubmit={handleSubmit}>
          <label>Banner Picture</label>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Avatar
              src={createPost.bannerPic}
              size={80}
            />
            <Button onClick={openUpdatingBannerPicModal}>Upload Banner</Button>
          </div>
          <label>Title</label>
          <Input
            className='title'
            placeholder='Title of the Your Post'
            type='text'
            value={createPost.title}
            name='title'
            onChange={handleChange}
            required
          />
          <label>Tags</label>
          <MultiSelect
            data={data}
            defaultValue={createPost.tags}
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
              dispatch(setCreatePost({ ...createPost, tags: value }));
            }}
          />
          <label>Description</label>
          <ReactQuill
            className='post_content'
            theme='snow'
            modules={module}
            value={createPost.content}
            onChange={(e) =>
              dispatch(setCreatePost({ ...createPost, content: e }))
            }
          />
          <input
            className='submit'
            type='submit'
            value={postModelType === "EDIT_POST" ? "Edit Post" : "Publish"}
          />
        </BOX>
      </Left>
      <Right>
        <h1>Description Preview</h1>
        <Content {...createPost} />
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
  .ql-editor {
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
    &:hover {
      background: #5f5ff0;
    }
  }
`;

const Right = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;
