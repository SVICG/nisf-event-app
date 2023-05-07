import styled from 'styled-components';


const Wrapper = styled.section `

border-radius: 0.25rem;
width: 100%;
overflow: hidden;

.form {

    width: 100%;
    margin-top: 2rem;    
    margin-bottom: 3rem;
}

.date-row{
    display: flex;
}

.label-row{
    display: flex;
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

.clear-btn {
    margin-left: 1rem;
    color: var(--warning-color);
    background-color: var(--warning-bk);
}

.highlight {
  border: 2px solid red;
}

.help-tip{
    top: 18px;
    right: 18px;
    margin: 0.25rem 0 0 0.5rem;
    display: block;
    text-align: center;
    background-color: white;
    border-radius: 50%;
    border-width: 0.12rem;
    border-color: black;
    border-style: solid;
    width: 20px;
    height: 20px;
    font-size: 15px;
    line-height: 18px;
    cursor: default;
}

.help-tip:before{
    content:'?';
    font-weight: bold;
    color:black;
    text-align: center;
  
}

.help-tip:hover p{
   display:block; 
   transform-origin: 100% 0%;

    -webkit-animation: fadeIn 0.3s ease-in-out;
    animation: fadeIn 0.3s ease-in-out;

}

.help-tip p{    /* The tooltip */
    display: none;
    z-index: 99;
    text-align: left;
    background-color: #1E2021;
    margin-top: 3px;
    padding: 10px;
    width: 300px;
    position: relative;
    border-radius: 3px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    right: -4px;
    color: #FFF;
    font-size: 13px;
    line-height: 1.4;
}

.help-tip p:before{ /* The pointer of the tooltip */
   
    content: '';
    width:0;
    height: 0;
    right:10px;
    top:-12px;
}

.help-tip p:after{ /* Prevents the tooltip from being hidden */
    width:100%;
    height:40px;
    content:'';
    top:-40px;
    left:0;
}


@media (min-width: 992px){
    .form-center{
        grid-template-columns: 1fr;
        align-items: center;
        column-gap: 1rem;
    }

    .btn-container {
        margin-top: 0;
    }
    
}

@media (min-width: 1120px) {
    .form-center{
        grid-template-columns: 1fr;
    }
    .btn-container {
        margin: 0 1 0 1;
    }
    .form {
        max-width: 70%;
    }

}

@-webkit-keyframes fadeIn {
    0% { 
        opacity:0; 
        transform: scale(0.6);
    }

    100% {
        opacity:100%;
        transform: scale(1);
    }
}

@keyframes fadeIn {
    0% { opacity:0; }
    100% { opacity:100%; }
}


`

export default Wrapper