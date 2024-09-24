import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Heading = ({ tags = [], _id = "", title = "", type = "DISPLAY" }) => {
  const navigate = useNavigate();

  const nav = useCallback(() => {
    navigate(`/post/${_id}`);
  }, [_id, navigate]);

  return (
    <div className='heading'>
      <Title
        type={type}
        onClick={nav}
      >
        {title}
      </Title>
      <Tag>
        {tags.map((data, index) => (
          <div
            className='tag'
            key={index}
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

const Title = styled.div`
  text-transform: capitalize;
  font-size: ${({ type }) => (type === "DISPLAY" ? "38px" : "30px")};
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 800;
  &:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
`;
