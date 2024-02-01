import { Button, Card, Text, Title } from '@mantine/core'
import React from 'react'
import styled from 'styled-components'

const TopRecentTag = () => {
  return (
    <Container>
      <Card shadow="sm" style={{ maxWidth: 350, margin: 'auto', marginTop: 40, textAlign:'center', borderRadius: 10 }}>
      <Title order={3}>Top Hash Tag</Title>
      <Text size="sm" style={{ color: 'gray', marginBottom: 10, marginTop: 20 }}>
        <Button variant='light'>#react</Button> #ios #nextjs #iosuikit #react #ios #react #ios #react #ios #GITHUB #ios #SQL #ios #mongodb #ui #swift ui #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #j #ios #react #ios #react #ios #react #ios #swift #cprogramming #java #javaprogramming #mernStack #rubi #ROR #PHP #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios #react #ios
      </Text>
      </Card>
    </Container>
  )
}

export default TopRecentTag

const Container = styled.div `
    grid-column: 3;
`