import { Skeleton } from "@mantine/core";
import React from "react";
import styled from "styled-components";

const PopularTagsLoading = () => {
  const temp = new Array(10).fill(null);

  return (
   
      <Load>
      {temp.map((_, index) => {
        return (
            <Skeleton
            key={index}
              height={30}
              mt={6}
              width='25%'
              radius='sm'
            />
        );
      })}
          </Load>
  );
};

export default PopularTagsLoading;


const Load = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;
