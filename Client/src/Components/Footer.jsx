import { Card, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer shadow="sm" withBorder>
      <Sponsor>
        <Text >
          Special thanks to our Diamond Sponsor{' '}
          <a href='https://www.interdeccaan.in/' target="_blank" rel="noopener noreferrer">
            IDS
          </a>{' '}
          for empowering our community.
        </Text>
      </Sponsor>

      <Description>
        <Text  align="center">
          <Link to="/">Nothing's New</Link> is an inclusive and constructive network for software developers. We are here to support your journey, every step of the way.
        </Text>
      </Description>

      <Copyright>
        <Text align="center">
          Built with passion by the{' '}
          <a href="https://thirdi.netlify.app/About" target="_blank" rel="noopener noreferrer">
            Thirdi
          </a>{' '}
          team. Nothing's New Community © 2024.
        </Text>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 20px;
  background-color: white;
  border-top: 1px solid #e9ecef;
  margin-top: 40px;
  position: relative;
  bottom: 0px;
  width: 100%;
a {
  color: #007bff;
  text-decoration: none;
  font-weight: 800;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
}
`;

const Sponsor = styled.div`
  margin-bottom: 15px;
  text-align: center;
  
`;

const Description = styled.div`
  max-width: 600px;
  margin-bottom: 20px;
  text-align: center;
`;

const Copyright = styled.div`
  /* margin-top: 20px; */
  text-align: center;
`;
