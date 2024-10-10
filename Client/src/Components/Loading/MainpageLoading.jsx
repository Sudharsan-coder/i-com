
import { styled } from 'styled-components'
import LoadingSkeleton from './LoadingSkeleton'

const MainpageLoading = () => {
  return (
    <Loading>
      <LoadingSkeleton/>
      <LoadingSkeleton/>
      <LoadingSkeleton/>
      <LoadingSkeleton/>
      <LoadingSkeleton/>
    </Loading>
  )
}

export default MainpageLoading

const Loading=styled.div`
  margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

`