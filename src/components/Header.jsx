import { NavLink, Link ,useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import LoggedInContext from '../context/LoggedInContext';

function Header({handleSignOut}) {
const {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext)
const navigate = useNavigate();

  

  const onSignOut = () =>{
    handleSignOut();
  navigate("/",{replace: true})
  }
  const activeStyle={
    textDecoration: "underline",
    color:"#000"
  }

  return (
    <nav className="navbar bg-white shadow-md">
    <h1><Link className='text-black font-bold md:text-2xl text-lg' to="/">NOC Monitor</Link></h1>
     <ul className="main-menu !gap-4">
      <li ><NavLink 
                 to="."
                 end
                 style={({isActive})=> isActive ? activeStyle:null}
                 className="text-sm md:text-base text-gray-600 hover:text-black transition-colors"
                 > Dashboard</NavLink></li>
      <li ><NavLink 
                 to="/report/cm"
                 end
                 style={({isActive})=> isActive ? activeStyle:null}
                 className="text-sm md:text-base text-gray-600 hover:text-black transition-colors"
                 > Reports</NavLink></li>
          {
            isLoggedIn ? 
            <li className="menu-item"><button className='btn text-xs' onClick={onSignOut} >Sign out</button></li>
          :
          <li className="menu-link"><Link to="/signin">
            <button className='btn text-xs' >Sign In</button>
          </Link></li>
          }
     </ul>
    </nav>
  )
}

export default Header