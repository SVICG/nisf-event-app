import styled from 'styled-components';


const Wrapper = styled.section`

margin: 3rem;
display: flex;
justify-content: center;
align-items: center;
gap: 1rem;
height: 2rem;

.pageBtn {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    color: var(--font-color);

}

.active {
 
  color: var(--main-color);
}

.prev-btn,
.next-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.2rem;
    letter-spacing: 0.10rem;
    color: var(--font-color);
    text-transform: capitalize;
}

.prev-btn:hover,
.next-btn:hover {
    
    color: var(--main-color);
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