import styled from 'styled-components';


const Wrapper = styled.section`

margin-top: 4rem;

.events {
    justify-content:center;
    align-items:center;
    max-width: 800px;
 
}


@media (min-width: 992px) {
    .events {
    display: block;
    justify-content:center;
    align-items:center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    }
}

`
export default Wrapper;