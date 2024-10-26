import { Avatar, Indicator } from "@mantine/core";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const Profile_pic = (props) => {
  const handleRightClick = (e) => {
    e.preventDefault();
  };
  const { onlineUsers } = useSelector((state) => state.auth);
  const { userName = "", isOnline, _id } = props || {};
  const profilePicName =
    userName.length > 1
      ? (userName[0] + userName[userName.length - 1]).toUpperCase()
      : userName.toUpperCase();
  const userIsOnline = onlineUsers.find((data) => data === _id);
  return (
    <Contianer onContextMenu={handleRightClick}>
      <IndicatorBlock
        size={10}
        withBorder
        processing
        disabled={!isOnline && !userIsOnline}
      >
        <Block
          src={props.profilePicUrl}
          size={100}
        >
          {profilePicName}
        </Block>
      </IndicatorBlock>
    </Contianer>
  );
};
export default Profile_pic;

const Contianer = styled.div`
  position: relative;
  top: -50px;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  `;

const Block = styled(Avatar)`
border-radius: 100%;
border: 10px solid black;
  /* pointer-events: none; */
`;
const IndicatorBlock = styled(Indicator)`
  /* position: relative; */
  /* top:-50px; */
  /* margin: 0 auto; */
`;
