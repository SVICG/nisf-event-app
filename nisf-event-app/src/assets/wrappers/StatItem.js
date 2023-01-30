import styled from 'styled-components';


const Wrapper = styled.section `

padding: 2rem;
background-color: white;

border-bottom: 5px solid ${(props)=> props.color};


header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.count{
    display: block;
    font-size: 40px;
    color: ${(props)=> props.color};
}

.title {
    margin: 0;
    margin-top: 0.5rem;
    text-transform: capitalize;
    letter-spacing: 3;
    font-weight: bolder;
}

.icon {
    font-size: 40px;
    color: ${(props)=> props.color};
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