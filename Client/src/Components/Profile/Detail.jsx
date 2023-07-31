import {GrLocation} from 'react-icons/gr'
import {LiaBirthdayCakeSolid} from 'react-icons/lia'
import {FiMail} from 'react-icons/fi'
import { styled } from 'styled-components'

const Detail = () => {
  return (
    <Block>
    <div className="name">Sudharsan</div>
    <div className="about">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae vitae distinctio consequatur expedita perspiciatis mollitia, illo voluptatem maiores! Ipsa repellat earum vel magnam deserunt corrupti corporis soluta reprehenderit aspernatur, ducimus blanditiis voluptas illo nulla nisi enim nobis? Hic harum quis eius, laboriosam quos distinctio, ratione, asperiores voluptatem illo quas repellat.
    </div>
    <div className="details">
        <GrLocation size="25px"/>
        Thiruchengode
        <LiaBirthdayCakeSolid size="25px"/>
        22 Jan 2003
        <FiMail size="25px"/>
        sudharsan220103@gmail.com
    </div>
    </Block>
  )
}

export default Detail

const Block=styled.div`
position: relative;
top: -50px;
    width: 100%;
    padding: 0px 10%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 25px;
    .name{
        font-size: 1.5em;
        font-weight: 1000;
    }
    .details{
        display: flex;
        justify-content: space-around;
        gap:20px;
        align-items:center;
        width:fit-content;
    }
`