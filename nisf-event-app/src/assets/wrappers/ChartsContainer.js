import styled from 'styled-components';


const Wrapper = styled.section `

padding: 1rem;
/* background-color: #e5e5e5; */
border-bottom: 5px solid;
border-color: (--dark-color);

button {
    float: right;
    position: relative;
    z-index: 99;
    height: 35px;
    margin-top: 1rem;
    text-transform: capitalize;
    color: var(--font-color);
    font-size: 1rem;
    background-color:transparent;
}

button:hover {
  background-color: black;
  color: white;
}



h4{
    padding-top: 3rem;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.chart {
  
  height: 400px;
  margin: 10px;
  background-color: white;
  padding: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

@media (min-width: 1120px) {
  .chart {
    flex-basis: 48%;
    width: 0;
  }
    
}


@media (max-width: 768px) {
  .chart {
    max-width: 100%;
    flex-basis: 100%;
    
  }
}

`
 export default Wrapper;