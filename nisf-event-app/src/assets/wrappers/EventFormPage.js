import styled from 'styled-components';


const Wrapper = styled.section `

border-radius: 0.25rem;
width: 100%;
overflow: hidden;

.form {
    
    max-width: 70%;
    width: 100%;
    margin-top: 2rem;    
}

.date-row {
    display: flex;
    /* width: 50%; */
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

.help-tip{
    /* position: absolute; */
    top: 18px;
    right: 18px;
    margin-left:1rem;
    display: block;
    text-align: center;
    background-color: var(--dark-color);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 11px;
    line-height: 22px;
    cursor: default;
}

.help-tip:before{
    content:'?';
    font-weight: bold;
    color:#fff;
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
    padding: 20px;
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
    /* position: relative; */
    content: '';
    width:0;
    height: 0;
    border:6px solid transparent;
    border-bottom-color:#1E2021;
    right:10px;
    top:-12px;
}

.help-tip p:after{ /* Prevents the tooltip from being hidden */
    width:100%;
    height:40px;
    content:'';
    /* position: absolute; */
    top:-40px;
    left:0;
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
        grid-template-columns: 1fr;
    }
    .btn-container {
        margin-top: 0;
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