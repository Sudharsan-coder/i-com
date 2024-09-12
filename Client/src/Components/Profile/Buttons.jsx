import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Message_button from "./Message_button";

const Buttons = (props) => {
  const [report, setReport] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);
  const { isAuth, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props?._id) {
      setIsfollowing(user.followings.includes(props._id));
    }
  }, [user.followings, props?._id]);

  const handleFollow = () => {
    if (!isAuth) {
      navigate('/sign_in');
    } else {
      const actionType = isfollowing ? "UNFOLLOW_PROFILE" : "FOLLOW_PROFILE";
      dispatch({
        type: actionType,
        data: { authId: user._id, profileId: props._id },
      });

      setIsfollowing(!isfollowing); // Toggle following state
    }
  };

  return (
    <Block>
      <Followbtn
        type="button"
        value={isfollowing ? "Following" : "Follow"}
        onClick={handleFollow}
        isfollowing={isfollowing.toString()}
      />
      {/* <div
        className="more"
        onClick={() => {
          setReport(!report);
        }}
      >
        <TfiMoreAlt />
      </div> */}
      <Message_button {...props}/>
      {/* <div className={report ? "report" : "report close"}>
        <input type="button" value="Report" />
      </div> */}
    </Block>
  );
};

export default Buttons;

const Block = styled.div`

  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  .more {
    cursor: pointer;
  }
  .report {
    display: block;
    input[type="button"] {
      position: absolute;
      top: 45px;
      right: -60px;
      padding: 1.5% 8%;
      background: rgb(245, 245, 245);
      color: black;
    }
  }
  .close {
    display: none;
  }
`;

const Followbtn = styled.input`
  background: ${({ isfollowing }) =>
    isfollowing === "true" ? "gray" : "rgb(66, 99, 235)"};
  padding: 11px 15px;
  border: 0px;
  border-radius: 5px;
  margin-right: 2%;
  color: white;
  cursor: pointer;
  &:hover {
    background: ${({ isfollowing }) =>
      isfollowing === "true" ? "rgb(66, 99, 235)" : "gray"};
  }
`;
