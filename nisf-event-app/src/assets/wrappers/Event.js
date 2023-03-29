import styled from 'styled-components';


const Wrapper = styled.article`

background: transparent;
/* display: grid;
grid-template-rows: 1fr auto; */
box-shadow: 0px;
border-radius: 0.3px;
margin: 5px 10px;
padding: 2px;
justify-content:center;
align-items:center;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

header {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid;
    display: grid;
    
    /* grid-template-columns: auto 1fr; */
    align-items: center;
}

.content {
    padding: 0rem 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns:  2fr 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns:  2fr 1fr;
    }
  }

.content-center {

    background-color: white;
    border-right: 1px solid;

}

footer{
    margin-top: 1rem;
    
}

.info {
    h5 {
      margin-bottom: 0.25rem;
      font-weight: 600;
    }
    p{
      margin: 0rem;
      background: #fae4b4;
      color: #b38014;
      font-weight: 300;
      padding: 2px 10px;
      border-radius: 5px;
      width: fit-content;
      -webkit-box-decoration-break: clone;
      -moz-background-inline-policy: clone;
      box-decoration-break: clone;
    }
  }

  .admin {
    font-size: 1.5rem;
    display: float;
    float: left;
    width: 30%;
    margin: 0.5rem;
  }


.actions {
  display: inline-block;
  margin-top: auto;
  padding: 2rem;
  .status{
    text-transform: capitalize;
    padding-bottom: 10px;
  }
}

.edit-btn, .delete-btn {
    height: 40px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 
}

.edit-btn {
    color: #1B6868;
    background-color: #9EE5E5;
    margin-right: 6px;

    
}

.delete-btn {
    color: darkred;
    background-color: pink;
    
}

.toggle{
  margin: 0.5rem;
  padding-top: 0.20rem;
}

`
export default Wrapper;