import styled from 'styled-components';

const Wrapper = styled.aside`
@media (min-width: 992px) {
    display: none;
}

.sidebar-container {
    position:fixed;
    inset: 0;
    display:flex;
    justify-content:center;
    align-items:center;
    background: var(--bkcolor);
    z-index: -1;
    opacity: 0; 
    
}

.logo{
    display:flex;
    align-items:center;
    width:100px;
   
}
.show-sidebar {
    z-index:99;
    opacity:1;
}

.content {
    background-color: whitesmoke;
    height:95vh;
    display:flex;
    position: relative;
    align-items:center;
    flex-direction:column;
    border-radius: var(--borderRadius);
    width:90vw;
    padding: 4rem 2rem;
}

.close-btn {
    background: transparent;
    border-color:transparent;
    position:absolute;
    top: 10px;
    left: 10px;
    font-size: 2rem;
}

.nav-links {
    display:flex;
    flex-direction: column;
    padding:1rem;
}

.nav-link {
    display:flex;
    align-items:center;
    padding: 1rem 0;
    text-transform: capitalize;
    color: gray;
}

.nav-link:hover {
    color:darkgray;
}

.nav-link:hover .icon{
    color:darkgray;
}

.icon {
    font-size: 1.8rem;
    margin-right:1rem;
    display: grid;
    place-items: center;
    color: var(--font-color);
}

.active {
    color:  var(--font-active);
}

.active .icon {
    color: var(--font-active);
}
`

export default Wrapper;