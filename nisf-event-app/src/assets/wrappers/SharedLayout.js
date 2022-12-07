import styled from 'styled-components';

const Wrapper = styled.section `

    .dashboard {
        display:grid;
        grid-template-columns: 1fr;
    }

    .dashboard-page {
        width: 90vw;
        margin: 0 auto;
        padding:2 rem 0;
    }

    @media (min-width: 992px) {
        .dashboard{
            // auto - size of column determuined by container / 1fr is 1 fraction so splits columns evenly
            grid-template-columns: auto 1fr;
        }

        .dashboard-page {
            width: 90%;
        }
    }

`

export default Wrapper;