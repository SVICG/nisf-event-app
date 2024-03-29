import styled from 'styled-components';

const Wrapper = styled.aside`

display: none;

@media (min-width: 992px) {
    display:block;
    
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
        align-items: right;
        min-height: 100vh;
        height:100%;
        width:250px;
        background: var(--bkcolor);
        margin-left: -250px;
    }

    .content {
        position:sticky;
        top: 0;
    }

    .show-sidebar {
        margin-left: 0;
    }

    header {
        display: flex;
        align-items: center;
        padding-left: 2.5rem
    }

    .nav-links {
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }

    
    .logo{
        display:flex;
        align-items:center;
        width:100px;
    }

    .nav-link {
        display:flex;
        align-items: center;
        padding: 1rem 0;
        text-transform: capitalize;
        color:gray;
        transition: 0.3s ease-in-out all;;
    }

    .nav-link:hover {
    color:var(--dark-color);
    padding-left: 3rem;
    background: var(--dark-hover);
}

    .nav-link:hover .icon{
        background: none;
        color:var(--dark-color);
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
            

}


`

export default Wrapper;