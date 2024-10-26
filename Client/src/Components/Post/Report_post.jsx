import { Button, Text, Textarea, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Report_post = ({ url }) => {
  const dispatch = useDispatch();
  const [errorReporMessage, setErrorReporMessage] = useState("")
  const [repost, setRepost] = useState({
    postUrl: url,
    message: "",
  });
  const submitReportHandler = () => {
    if (repost.message.length !== 0)
      dispatch({ type: "REPORT_POST", data: repost });
    else{
      setErrorReporMessage("Message is required")
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRepost({ ...repost, [name]: value });
  };

  return (
    <Container>
      <Header>
        <Text mb={10}>
          We continue to try to make this environment a great one for everybody.
          If you are submitting a bug report, please create a{" "}
          <a href='https://github.com/pradeepkumar24rk/i-community/issues/new'>
            GitHub issue
          </a>{" "}
          in the main repo.
        </Text>
      </Header>
      <Content>
        <TextInput
          label='Reported URL'
          value={url}
          name='postUrl'
          onChange={handleOnChange}
        />
        <Textarea
          data-autofocus
          label='Message'
          description='Please provide any additional information or context that will help us understand and handle the situation.'
          placeholder='...'
          mt='md'
          name='message'
          required
          error={errorReporMessage}
          onChange={handleOnChange}
        />
        <Button
          mt={10}
          onClick={submitReportHandler}
        >
          Submit
        </Button>
      </Content>
    </Container>
  );
};

export default Report_post;

const Container = styled.div``;
const Header = styled.div`
  text-align: justify;
  a {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
    font-weight: 800;
  }
`;
const Content = styled.div`
  /* display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center; */
`;
