import React from 'react';
import { Card, Avatar, Title, Text, Button } from '@mantine/core';
import styled from 'styled-components';

const ProfileCard = () => {
  return (
  <Container>
    <Card shadow="sm" style={{ maxWidth: 250, margin: 'auto', marginTop: 40, textAlign:'center' }}>
      <div style={{ textAlign: 'center', marginBottom: 15, display: 'flex', justifyContent: 'center' }}>
        <Avatar size={80} radius="xl" src={"https://images.pexels.com/photos/1374509/pexels-photo-1374509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={"pradeep"} />
      </div>
      <Title order={3} orderMd={2} style={{ marginBottom: 5 }}>
      pradeep
      </Title>
      <Text size="sm" style={{ color: 'gray', marginBottom: 10 }}>
        @{"pradeep24"}
      </Text>
      <Button
        variant="light"
      >
        View full Profile
      </Button>
    </Card>
  </Container>
  );
};

export default ProfileCard;

const Container = styled.div `
  grid-column:1;
`


