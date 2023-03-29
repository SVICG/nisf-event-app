import styled from 'styled-components'

const Wrapper = styled.div`


  width:40px;
  height:18px;
  margin: 10px 0;
  border-radius: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props)=>(props.isOn ===true? 'green' : 'grey')};
  position: relative;
  transition: background-color 300ms linear;

  &:before{
    content: '';
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    margin: 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: ${(props)=> (props.isOn === true ? '22px' : '0')};
    transition: left 300ms linear;
  }

`

export default Wrapper