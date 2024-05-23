import { useState } from "react";
import { styled } from "styled-components";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { Box, Input, LoadingOverlay, MultiSelect } from "@mantine/core";
import { AiFillExclamationCircle } from "react-icons/ai";

// export const Post_content=createContext();

const Post_create_box = ({ close }) => {
  const auth = useAuth();
  const [visible, toggle ] = useState(false);

  const [postUpload, setPostUpload] = useState({
    title: "",
    content: "",
    tags: [],
    bannerPic:"",
  });

  const { tags, ...others } = postUpload;

  // console.log(tag)
  
  const imagetobase64=(e)=>{
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      setPostUpload({...postUpload,bannerPic:reader.result});
    }
    reader.onerror=(err)=>{
      console.log(err);
    }
  }

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
    toggle(true);
    axios
      .post("https://icom-okob.onrender.com/post/create", postUpload,{
          headers: {
            token: `Bearer ${auth.user.accessToken}`,
          },
        
      })
      .then((res) => {
        console.log(res);
        close(false);
        notifications.show({
          title: "Posted Successfully",
          message: "Hey there,User post is Uploaded",
        });
      })
      .catch((err) => {
        notifications.show({
          title: "Post Not Uploaded",
          message: "Some thing went Wrong",
          color: "red",
          icon: (
            <AiFillExclamationCircle
              color='white'
              size='3rem'
            />
          ),
        });
        console.log(err);
        toggle(false);
      });
  };

  return (
    <Box
      pos='relative'
    >
      <LoadingOverlay
        visible={visible}
        overlayBlur={2}
      />
      <Container onSubmit={handleSubmit}>
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
        <textarea
          className='post_context'
          placeholder='Provide in markup language'
          name='content'
          onChange={handleChange}
        ></textarea>
        <input
          className='submit'
          type='submit'
          value='Post'
        />
      </Container>
    </Box>
  );
};

export default Post_create_box;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* background-color: rgb(227, 226, 226); */
  /* padding: 1.5% 5%; */
  width: fit-content;
  .add_tag {
    width: 200px;
  }
  textarea {
    width: 450px;
    height: 200px;
    border-radius: 10px;
    font-size: 20px;
    padding: 10px;
    &:focus {
      border: 1px solid #1a89ea;
      outline: none;
    }
    &::placeholder {
      color: #d2d0d0;
      font-size: 18px;
    }
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
    cursor: pointer;
  }
`;
