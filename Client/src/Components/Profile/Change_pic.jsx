import { Avatar, Button } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FaDownload } from "react-icons/fa6";

const Change_pic = () => {
  const [pic, setPic] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const dispatch = useDispatch();

  // Handle selected file change
  const handleImageFileChange = (selectedFile) => {
    setProfileImageFile(selectedFile);
  };

  // Handle image submission
  const handleImageFileSubmit = (e) => {
    dispatch({ type: "UPDATE_PIC", data: { file: profileImageFile } });
  };

  // Convert image to base64 and set the picture
  const imagetobase64 = (file) => {
    const reader = new FileReader();
    handleImageFileChange(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPic(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };

  // Handle drag and drop functionality
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    imagetobase64(file);
  };

  // Prevent default behavior for drag-over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      {pic === "" ? (
        <UploadImageBlock
          htmlFor='input-file'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type='file'
            id='input-file'
            accept='image/*'
            title='Drag & Drop Image or Select the Image'
            className='uploadImageFile'
            hidden
            onChange={(e) => imagetobase64(e.target.files[0])}
          />
          <IconView>
            <FaDownload size={30} />
            <p>
              Drag & Drop Image
              <br /> or <br /> Select the Image
            </p>
          </IconView>
        </UploadImageBlock>
      ) : (
        <Avatar
          color='blue'
          src={pic}
          w={200}
          h={200}
        />
      )}
      <Button
        onClick={handleImageFileSubmit}
        fullWidth
      >
        Upload Picture
      </Button>
    </Container>
  );
};

export default Change_pic;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const UploadImageBlock = styled.label`
  border: 2px dashed var(--primary_color);
  color: var(--primary_color);
  border-radius: 0.2em;
  background-color: white;
  padding-top: 3%;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const IconView = styled.div`
  text-align: center;
  padding: 20px;
`;
