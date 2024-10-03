import React, { useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Heading = ({ tags = [], _id = "", title = "", type = "DISPLAY" }) => {
  const navigate = useNavigate();
  const tagClickHandler=(tagValue)=>{
    navigate(`/search?tag=${tagValue}`)
  }
  return (
    <div className='heading'>
      <Title
        type={type}
        to={`/post/${_id}`}
      >
        {title}
      </Title>
      <Tag>
        {tags.map((data, index) => (
          <div
            className='tag'
            key={index}
            onClick={()=>tagClickHandler(data)}
          >
            #{data}
          </div>
        ))}
      </Tag>
    </div>
  );
};

Heading.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Heading;

const Tag = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;

  .tag {
    font-size: 0.6em;
    &:hover {
      cursor: pointer;
      color: var(--primary_color);
      text-decoration: underline;
    }
  }
`;

const Title = styled(Link)`
  text-transform: capitalize;
  font-size: ${({ type }) => (type === "DISPLAY" ? "38px" : "30px")};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 800;
  color: black;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
`;
