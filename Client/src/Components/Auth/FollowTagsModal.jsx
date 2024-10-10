import React, { useState } from "react";
import { Modal, MultiSelect, Button, Text, Badge, Group } from "@mantine/core";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setFollowTagsModal } from "../../Redux/Slices/authSlice";

const FollowTagsModal = () => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const { user,followTagsModal } = useSelector((state) => state.auth);
  
  const tags = [
    "IOS",
    "React",
    "js",
    "ML",
    "AI",
    "Java",
    "Cprogramming",
    "Ruby",
    "MERN",
    "MARN",
    "Android",
    "visualStudio",
    "Swift",
    "SwiftUI",
    "BlockChain",
    "JQuery",
    ,
  ];

  const closeModal = () => {
    dispatch(setFollowTagsModal(false));
  };

  // Handle clicking a badge
  const handleBadgeClick = (tagValue) => {
    if (!selectedTags.includes(tagValue)) {
      setSelectedTags((prevTags) => [...prevTags, tagValue]);
    }
  };

  const handleSave = () => {
    console.log("Selected tags:", selectedTags);
    dispatch({
      type: "UPDATE_PROFILE",
      data: {
        _id: user._id,
        profiledetails: {
          followingHashTags: selectedTags,
        },
      },
    });
    closeModal();
  };

  return (
    <Modal
      opened={followTagsModal}
      onClose={closeModal}
      title='Follow Tags'
      centered
    >
      <Text
        size='sm'
        color='dimmed'
        style={{ marginBottom: "20px" }}
      >
        Discover relevant posts by following tags that interest you. Select the
        badges below to quickly add them to your interests or manually search
        for tags in the input field.
      </Text>

      {/* Tag Badges */}
      <Group
        spacing='xs'
        style={{ marginBottom: "20px" }}
      >
        {tags.map((tag, index) => (
          <StyledBadge
            key={index}
            variant={selectedTags.includes(tag) ? "filled" : "outline"}
            onClick={() => handleBadgeClick(tag)}
          >
            {tag}
          </StyledBadge>
        ))}
      </Group>

      {/* Tag Selection */}
      <MultiSelect
        data={tags}
        value={selectedTags}
        onChange={setSelectedTags}
        label='Choose your interests'
        placeholder="Pick tags you're interested in"
        searchable
        nothingFound='No tags found'
      />

      {/* Save Button */}
      <Button
        onClick={handleSave}
        style={{ marginTop: "20px" }}
      >
        Save Tags
      </Button>
    </Modal>
  );
};

export default FollowTagsModal;

// Styled Badge
const StyledBadge = styled(Badge)`
  cursor: pointer;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;
