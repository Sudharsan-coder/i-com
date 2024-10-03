import { Button, Card, Text } from "@mantine/core";
import React from "react";
import styled from "styled-components";

const Log_in_card = () => {
  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={700} color="var(--primary_color)">
          Nothing's New is a community of 2,097,187 amazing developers
        </Text>
        <Text c='dimmed'>
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </Text>
        <Button fullWidth mt="md" variant="outline" component="a" href="/sign_up"> Create Account</Button>
        <Button fullWidth mt="md" variant="subtle" color="gray" size="md" component="a" href="/sign_in"> Sign in</Button>
      </Card>
    </Container>
  );
};

export default Log_in_card;

const Container = styled.div`
  grid-column: 1;
  grid-row: 2;
  .mantine-Card-root{
    margin: 30px;
  }
  /* a{
    color: #cacbcc;
    text-decoration: none;
  } */
`;
