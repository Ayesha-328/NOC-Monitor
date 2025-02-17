import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import googleIcon from "../assets/google-icon.png"
import {auth, provider} from "../config/firebase-config"
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import LoggedInContext from '../context/LoggedInContext';

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const {isLoggedIn , setIsLoggedIn} = useContext(LoggedInContext)
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // const authState=location.state && location.state.message;
    const authState = location.state?.message;
    const path=location.state?.path;

    const signInWithGoogle = async(e) =>{
        e.preventDefault
        const result = await signInWithPopup(auth, provider);
        const authInfo={
            userId : result.user.uid,
            username: result.user.displayName,
            profilePic : result.user.photoURL,
            isAuth : true
        }
        localStorage.setItem("auth", JSON.stringify(authInfo))
        setIsLoggedIn(true)
        navigate(path ? path : "/host", { replace:true })
    }



    function signInWithEmail(e) {
        e.preventDefault();
        setStatus("submitting")
        console.log("handle submit ran")
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(result => {
                const authInfo={
                    userId : result.user.uid,
                    username: result.user.displayName,
                    profilePic : result.user.photoURL,
                    isAuth : true
                }
                localStorage.setItem("auth", JSON.stringify(authInfo))
                setIsLoggedIn(true)
                
                navigate(path ? path : "/report", { replace:true })
                setError(null)
            })
            .catch(err => setError(err))
            .finally(() => {
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

    }
    return (
        <div className="site-wrapper">
        <div className="container">
            <div className="login-container">
                {authState ? <h3 className='error'>*{authState}</h3> : null}
                <h3 className="main-heading">Sign in to your account</h3>
                {error?.message && <h4>{error.message}</h4>}
                <form className='login-form'>
                    <div className="input-fields">
                        <input
                            onChange={handleChange}
                            type="text"
                            className="input"
                            name="email"
                            value={formData.email}
                            placeholder='Email address' />
                        <input
                            onChange={handleChange}
                            type="password"
                            className="input"
                            name="password"
                            value={formData.password}
                            placeholder='Password' />
                    </div>
                    <button disabled={status === "submitting"} onClick={signInWithEmail} className="btn">
                        {status === "submitting" ? "Signing in" : "Sign In"}
                    </button>
                    <button onClick={signInWithGoogle} disabled={status === "submitting"} className="btn">
                        <img className="btn-google-icon" src={googleIcon} alt="" />
                        {status === "submitting" ? "Logging in" : "Sign in with Google"}
                    </button>

                </form>
                    <p>Don't have an account. <Link to={"/signup"}>Sign Up</Link></p>

            </div>

        </div>

        </div>
    )
}

export default SignIn