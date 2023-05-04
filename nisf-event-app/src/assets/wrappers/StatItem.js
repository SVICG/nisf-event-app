import styled from 'styled-components';


const Wrapper = styled.section`

padding: 2rem;
background-color: white;
border-bottom: 5px solid ${(props) => props.color};
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.count{
    display: block;
    font-size: 40px;
    color: ${(props) => props.color};
}

.title {
   display: block;
    margin: 0;
    margin-bottom: 0rem;
    font-family: var(--headingFont);
    line-height: 1.3;
    text-transform: capitalize;
    font-size: 1.2rem;
    letter-spacing: 3;
    font-weight: bolder;
  
}

.icon {
    font-size: 40px;
    color: ${(props) => props.color};
    display: flex;
    align-items: center;
}


@media (min-width: 992px) {
    .events {
    display:grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1rem;
}
}
`
export default Wrapper;