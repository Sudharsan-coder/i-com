import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Heading = ({ tags = [], _id = "", title = "" }) => {
  const navigate = useNavigate();

  const nav = useCallback(() => {
    navigate(`/post/${_id}`);
  }, [_id, navigate]);

  return (
    <div className='heading'>
      <Title onClick={nav}>{title}</Title>
      <Tag>
        {tags.map((data, index) => (
          <div
            className='tag'
            key={index}
          >
            #{data}&emsp;
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
    font-size: 0.75em;
  }
`;

const Title = styled.div`
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
`;
