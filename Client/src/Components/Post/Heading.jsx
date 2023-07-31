import { styled } from "styled-components";
const Heading = (props) => {
const tag=props.tag;
  return (
    <div className="heading">
      <div>{props.title}</div>
      <Tag >
      {
        tag.map((data,index)=>(
            <div className="tag" key={index}>#{data}</div>
            ))
          }
          </Tag>
    </div>
  );
};

export default Heading;

const Tag = styled.div`
  display: flex;

  margin-top: 10px;
  .tag{
    font-size: 0.55em;
  }
`;
