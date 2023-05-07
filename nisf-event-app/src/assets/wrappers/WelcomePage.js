import styled from 'styled-components'

const Wrapper = styled.main`
nav {
    width: 90vw;
    max-width: 1120px;
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
}


.page {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -1rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--main-color);
    }
  }

  .logo {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 2fr;
      column-gap: 3rem;
    }
    
    .logo {
      max-height: 500px;
      display: flex;
      margin-left: 5rem;
    
    }
  }

`

export default Wrapper;