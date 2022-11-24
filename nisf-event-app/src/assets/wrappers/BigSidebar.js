import styled from 'styled-components';

const Wrapper = styled.aside `

display: none;

@media (min-width: 992px) {
    display:block;
    .sidebar-container {
        min-height: 100vh;
        height:100%;
        width:250px;
    }
}


`

export default Wrapper;