import styled from 'styled-components';

const Wrapper = styled.nav `

height: var(--nav-height);
display: flex;
align-items: center;
justify-content: center;
background: var(--bkcolor);

.logo{
    display:flex;
    align-items:center;
    width:100px;
   
}

.nav-center{
    display:flex;
    align-items: center;
    justify-content: space-between;
    width: 90vw;
    height: fit-content;

}

.btn-container {
    position:relative;
}

.toggle-btn {
    font-size: 2rem;
    display:flex;
    align-items: center;
    background-color:transparent;
    border-color: transparent;
}

.btn {
    display:flex;
    align-items: center;
    justify-content: center;
    position:relative;
}

.dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100px;
    text-align: center;
    visibility: hidden;
    background: var(--bkcolor);
    padding: 0.2rem;
    border-radius: var(--borderRadius);
}

.show-dropdown {
    visibility: visible;
}

.dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--main-color);
    cursor: pointer;
    
}

.logo-text{
    display:none;
    margin:none;
}

@media (min-width: 992px) {
    position:sticky;
    top:0;

    .nav-center {
        width:90%;
   }

   .logo {
    display:none;
   }

   .logo-text{
    display:block;
    padding: 20px 0 0 0;
   }
}
`

export default Wrapper;