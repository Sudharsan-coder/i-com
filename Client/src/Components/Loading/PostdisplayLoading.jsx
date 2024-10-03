import { Skeleton } from '@mantine/core'
import React from 'react'
import { styled } from 'styled-components'

const PostdisplayLoading = () => {
  return (
    <Load>
      <Skeleton height={300} mb={20} />
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </Load>
  )
}

export default PostdisplayLoading

const Load=styled.div`
  border: 1px solid white;
  padding:3%;
  border-radius: 10px;
  grid-column: 2;
  margin-top: 10px;
`