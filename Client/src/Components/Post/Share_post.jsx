import React from "react";
import {
  TwitterShareButton,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";
import styled from "styled-components";
const Share_post = (props) => {
  const shareUrl = props.shareURL;
  const title = "Nothing's New - " + props.title;
  return (
    <Container>
      <TwitterShareButton
        url={shareUrl}
        title={title}
        className='Demo__some-network__share-button'
      >
        <XIcon
          size={32}
          round
        />
      </TwitterShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={title}
        className='Demo__some-network__share-button'
      >
        <TelegramIcon
          size={32}
          round
        />
      </TelegramShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=':: '
        className='Demo__some-network__share-button'
      >
        <WhatsappIcon
          size={32}
          round
        />
      </WhatsappShareButton>
      
      <LinkedinShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
    </Container>
  );
};

export default Share_post;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;
