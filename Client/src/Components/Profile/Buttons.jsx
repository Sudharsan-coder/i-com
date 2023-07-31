import { styled } from "styled-components";
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
const Buttons = () => {
  const [report, setReport] = useState(false);
  return (
    <Block>
      <input type="button" value="Follow" />
      <div
        className="more"
        onClick={() => {
          setReport(!report);
        }}
      >
        <TfiMoreAlt />
      </div>
      <div className={report?"report":"report close"}>
        <input type="button" value="Report" />
      </div>
    </Block>
  );
};

export default Buttons;

const Block = styled.div`
  width: 95%;
  position: relative;
  top: -100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  input[type="button"] {
    background: rgb(66, 99, 235);
    padding: 11px 15px;
    border: 0px;
    border-radius: 5px;
    margin-right: 5%;
    color: white;
    cursor: pointer;
    &:hover {
      background: blue;
    }
  }
  .more {
    cursor: pointer;
  }
  .report {
    display: block;
    input[type="button"] {
      position: absolute;
      top: 45px;
      right: -60px;
      padding: 1.5% 8%;
      background: rgb(245, 245, 245);
      color: black;
    }
  }
  .close{
    display: none;
  }
`;
