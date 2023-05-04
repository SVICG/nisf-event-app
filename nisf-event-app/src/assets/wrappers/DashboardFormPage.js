import styled from 'styled-components';

const Wrapper = styled.section`

border-radius: 0.25rem;
width: 100%;

.form {
    max-width: 100%;
    width: 100%;
    margin-top: 2rem;     
}

.form-center {
    display: grid;
    row-gap: 0.5rem;
}

.form-center button {
    align-self: center;
    height: 35px;
    margin-top: 1rem;   
}

@media (min-width: 992px){
    .form-center{
        grid-template-columns: 1fr 1fr;
        align-items: center;
        column-gap: 1rem;
    }

    .btn-container {
        margin-top: 0;
    }
}

@media (min-width: 1120px) {
    .form-center{
        grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-container {
        margin-top: 0;
    }
}

`

export default Wrapper