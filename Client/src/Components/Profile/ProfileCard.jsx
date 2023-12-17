import React from 'react';
import { Card, Avatar, Title, Text, Badge } from '@mantine/core';

const ProfileCard = ({ name, username, bio, avatarUrl, badge }) => {
  return (
    <Card shadow="sm" style={{ maxWidth: 400, margin: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 15 }}>
        <Avatar size={80} radius="xl" src={avatarUrl} alt={name} />
      </div>
      <Title order={3} orderMd={2} style={{ marginBottom: 5 }}>
        {name}
      </Title>
      <Text size="sm" style={{ color: 'gray', marginBottom: 10 }}>
        @{username}
      </Text>
      <Text size="md" style={{ marginBottom: 15 }}>
        {bio}
      </Text>
      {badge && <Badge color="teal">{badge}</Badge>}
    </Card>
  );
};

export default ProfileCard;
