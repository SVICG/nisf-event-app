import styled from 'styled-components';


const Wrapper = styled.article `

background: var(--bkcolor);
display: grid;
grid-template-rows: 1fr auto;
box-shadow: 0px;
border-radius: 0.3px;
margin: 5px 10px;
padding: 2px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

header {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
}

.content {
    padding: 0rem 0.5rem;
  }

.content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
}

footer{
    margin-top: 1rem;
    
}

.info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p{
      margin: 0rem;
    }
  }


.actions {
    padding: 0rem 1rem 1rem;
  }

.edit-btn, .delete-btn {
    height: 44px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 
  
}



.edit-btn {
    color: #1B6868;
    background-color: #9EE5E5;
    margin-right: 6px;
    vertical-align: top;
    
}

.delete-btn {
    color: darkred;
    background-color: pink;
    
}

`
 export default Wrapper;