import parse from "html-react-parser";
import React from "react";
import styled from "styled-components";

const Content = (props) => {
  const val = props.content;
  // console.log(val);

  return <Container>{parse(val)}</Container>;
};
export default Content;

const Container = styled.div`
  h1,
  blockquote,
  a {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  p,
  ul li {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    font-size: 20px;
  }
  img{
    width: 500px;
    height:400px;
    object-fit: contain;
  }
  pre {
    background-color: #343333;
    color: aliceblue;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0.3px 2.2px rgba(0, 0, 0, 0.02),
      0px 0.8px 5.3px rgba(0, 0, 0, 0.028), 0px 1.5px 10px rgba(0, 0, 0, 0.035),
      0px 2.7px 17.9px rgba(0, 0, 0, 0.042), 0px 5px 33.4px rgba(0, 0, 0, 0.05),
      0px 12px 80px rgba(0, 0, 0, 0.07);
  }
  a {
    color: blue;
  }
`;
