import { Card, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Main_page_footer = () => {
  return (
    <Container>
    <Text>
      <Link to={'/'}>Nothing's New</Link> is an open-source community for developers to share knowledge and collaborate. Contribute to the <a href="https://github.com/Sudharsan-coder/i-com">platform</a> or share your own blog posts to help grow our collective tech wisdom.
    </Text>
    
    <Text mt={10}>
      Built with passion by the <a href="https://thirdi.netlify.app/About">Thirdi</a> team. Nothing's New Community © 2024.
    </Text>
  </Container>
  
  
  )
}

export default Main_page_footer

const Container = styled.div `
     grid-column: 1;
     grid-row: 3;
     margin: 30px;
     text-align: justify;
    a{
        font-size: large;
        font-weight: 600;
        color: var(--primary_color);
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`