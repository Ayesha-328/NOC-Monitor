import { Flex} from "@radix-ui/themes";
import { NavLink ,Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'


function HomeLayout() {
  const activeStyle={
    textDecoration: "underline",
    color:"#fff"
  }
  return (
    <>
    <nav className="home-navbar">
        <ul className="main-menu">
           {/* <li className="menu-item"><NavLink 
           to="."
           end
           style={({isActive})=> isActive ? activeStyle:null}
           > Generate</NavLink></li> */}
            <li className="menu-item"><NavLink
             to="/report/cm"
             style={({isActive})=> isActive ? activeStyle:null}
             >CMR</NavLink></li>
            <li className="menu-item"><NavLink
             to="/report/pm"
             style={({isActive})=> isActive ? activeStyle:null}
             >PMR</NavLink></li>
            <li className="menu-item"><NavLink
             to="/report/wo"
             style={({isActive})=> isActive ? activeStyle:null}
             >WO</NavLink></li>
        </ul> 
    </nav>
    <Flex direction="row">
      <Sidebar />
      <Outlet />
    </Flex>
    </>

  )
}

export default HomeLayout