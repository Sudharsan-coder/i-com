import { styled } from "styled-components";
const Heading = () => {
  return (
    <div className="heading">
      <div>Introduction to Machine Learning basics</div>
      <Tag>
        <div className="tag">#suda</div>
      </Tag>
    </div>
  );
};

export default Heading;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  .tag{
    font-size: 0.55em;
  }
`;
