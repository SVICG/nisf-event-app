import React from "react";
import Wrapper from "../assets/wrappers/ToggleSwitch";

  
const ToggleSwitch = ({ label, isOn, handle }) => {
  return (
    <Wrapper  isOn={isOn} onClick={handle}>
    <div >
   
    
  </div>
    </Wrapper>
  );
};
  
export default ToggleSwitch;