import { GrLocation } from 'react-icons/gr';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { FiMail } from 'react-icons/fi';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import React from 'react';

const Detail = (props) => {
  const { isAuth,user } = useSelector((state) => state.auth);

  return (
    <Block>
      <div className="name">{props.firstName}</div>
      <div className="about">
        {props.userBio ? props.userBio : user._id===props._id ? "Update your Profile" : "Bio is not Updated"}
      </div>
      <div className="details">
        {props.location && (
          <div className="detail-item">
            <GrLocation size="25px" />
            <span>{props.location}</span>
          </div>
        )}
        {props.DOB && (
          <div className="detail-item">
            <LiaBirthdayCakeSolid size="25px" />
            <span>{props.DOB}</span>
          </div>
        )}
        {props.emailId && (
          <div className="detail-item">
            <FiMail size="25px" />
            <span>{props.emailId}</span>
          </div>
        )}
      </div>
    </Block>
  );
};

export default Detail;

const Block = styled.div`
  position: relative;
  top: -50px;
  width: 100%;
  padding: 0px 1%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 25px;

  .name {
    font-size: 1.5em;
    font-weight: 1000;
  }

  .about {
    text-align: center;
    font-size: 1em;
    color: #555;
  }

  .details {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    align-items: center;
    width: fit-content;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1em;
    color: #333;
  }
`;
