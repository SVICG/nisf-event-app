import styled from 'styled-components';


const Wrapper = styled.section `

margin-top: 4rem;

.form {
   width: 100%;
   max-width: 100%;
}

.form-input,
.form-select,
.btn-block {
    height: 35px;
}

.form-row {
    width: 100%
    
}
select {
    width: 100%;
}

.form-row {
    margin-bottom: 0;
}

.form-center{
    display:grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.3rem;
}

.btn-block {
    align-self: end;
}

@media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }

}

@media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block{
        margin-top:0;
    }

}


`
 export default Wrapper;