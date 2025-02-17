import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Layout from './components/Layout'
import HomeLayout from './components/HomeLayout'
import Dashboard from './pages/Home/Dashboard'
import CM from "./pages/Home/CM"
import PM from "./pages/Home/PM"
import WO from "./pages/Home/WO"
import { ToastContainer } from "react-toastify";
import AuthRequired from './components/AuthRequired'
import { useState } from 'react'
import LoggedInContext from './context/LoggedInContext'
import "@radix-ui/themes/styles.css";
import UploadImages from './components/UploadImages'

function App() {
  const authInfo = JSON.parse(localStorage.getItem("auth"))
  const [isLoggedIn, setIsLoggedIn] = useState(authInfo?.isAuth)
  console.log("Log in from App comp" + isLoggedIn)

  const handleSignOut = () => {
    const authInfo = {
      userId: "",
      username: "",
      profilePic: "",
      isAuth: false,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    setIsLoggedIn(false);
  };

  return (
    <>

    <LoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout handleSignOut={handleSignOut} />}>
                <Route index element={<Dashboard />} />
            {/* Protected routes */}
            <Route element={<AuthRequired />}>
              <Route path="/report" element={<HomeLayout />}>
                <Route path='cm' element={<CM />} />
                <Route path='pm' element={<PM />} />
                <Route path='wo' element={<WO />} />
                <Route path='upload' element={<UploadImages />} />
              </Route>
            </Route>

            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>		
    </LoggedInContext.Provider>

    </>
  )
}

export default App
