import styled from 'styled-components';

const Wrapper = styled.aside `
@media (min-width: 992px) {
    display: none;
}

display:block;
    .sidebar-container {
        position:fixed;
        justify-content:center;
        align-items:center;
        min-height: 100vh;
        height:100%;
        width:250px;
    }

`

export default Wrapper;