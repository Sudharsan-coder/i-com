import { Skeleton } from '@mantine/core'
import React from 'react'
import { styled } from 'styled-components'

const ProfilepageLoading = () => {
  return (
    <Load>
    <Skeleton height={200} mb={20} />
    <Skeleton height={8} radius="xl" />
    <Skeleton height={8} mt={6} radius="xl" />
    <Skeleton height={8} mt={6} width="70%" radius="xl" />
  </Load>
  )
}

export default ProfilepageLoading

const Load=styled.div`
  /* border: 1px solid white; */
  padding:3%;
  border-radius: 10px;
  grid-column-start: 2;
  grid-column-end: 4;
  margin-top: 10px;
`