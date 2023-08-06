import { useNavigate } from "react-router";
import { styled } from "styled-components";
const Heading = (props) => {
const tag=props.tag;
const navigate=useNavigate();
const nav=()=>{
  navigate(`/post/${props._id}`);
}
  return (
    <div className="heading">
      <Title onClick={nav}>{props.title}</Title>
      <Tag >
      {
        tag.map((data,index)=>(
            <div className="tag" key={index}>#{data}&emsp;</div>
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

const Title=styled.div`
  &:hover{
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
`
