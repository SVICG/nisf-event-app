//An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered.
import { Outlet, Link } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import { Navbar, BigSidebar, SmallSidebar } from '../../components'

const SharedLayout = () => {
  return (
    <Wrapper>

      <main className="dashboard">

        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout