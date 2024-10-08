import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import React from 'react'
import IDS from '../../assets/IDS_sponsor.png'

const IDS_sponsor = () => {
  return (
    <Card shadow="sm"
    padding="xl"
    component="a"
    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    target="_blank" withBorder style={{
        minWidth: 300,
        margin: "30px",
        marginTop: 40,
        textAlign: "center",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}>
      <Card.Section >
        <Image
          src={IDS}
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Group style={{justifyContent:"space-between"}} mt="md" mb="xs">
        <Text fw={500}>IDS</Text>
        <Badge color="red">Sponsor</Badge>
      </Group>


      <Text size="sm" c="dimmed" align='justify'>
      This is a start-up company works on the Web Development, Android App Development, Domain Registartion, Web hosting and Search Engine Optimization
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Contact Now
      </Button>
    </Card>
  )
}

export default IDS_sponsor
