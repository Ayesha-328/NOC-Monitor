import React, { useState } from 'react'
import { useLocation, useNavigate ,Link} from 'react-router-dom';
import googleIcon from "../assets/google-icon.png"
import {auth, provider} from "../config/firebase-config"
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';

function SignUp({ onLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNo : "",
        password: ""
    })
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // const authState=location.state && location.state.message;
    const authState = location.state?.message;
    const path=location.state?.path;
    console.log(formData)

    const signInWithGoogle = async() =>{
            const result = await signInWithPopup(auth, provider);
            console.log(result)
            const authInfo={
                userId : result.user.uid,
                username: result.user.displayName,
                profilePic : result.user.photoURL,
                isAuth : true
            }
            localStorage.setItem("auth", JSON.stringify(authInfo))
            // const user = localStorage.getItem("auth");
            // console.log(user)
            navigate("/home")
        }



    function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting")
        console.log("handle submit ran")
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(data => {
                const authInfo={
                    userId : data.user.uid,
                    username: data.user.displayName,
                    profilePic : data.user.photoURL,
                    isAuth : true
                }
                localStorage.setItem("auth", JSON.stringify(authInfo))
                const user = localStorage.getItem("auth");
            console.log(user)
                setError(null)
                navigate("/home")
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
        <div className="container">
            <div className="login-container">
                {authState ? <h3 className='error'>*{authState}</h3> : null}
                <h3 className="main-heading">Sign Up</h3>
                {error?.message && <h4>{error.message}</h4>}
                <form onSubmit={handleSubmit} action="" className='login-form'>
                    <div className="input-fields">
                        <input
                            onChange={handleChange}
                            type="text"
                            className="input"
                            name="name"
                            value={formData.name}
                            placeholder='Full Name' />
                        <input
                            onChange={handleChange}
                            type="text"
                            className="input"
                            name="email"
                            value={formData.email}
                            placeholder='Email address' />
                        <input
                            onChange={handleChange}
                            type="text"
                            className="input"
                            name="phoneNo"
                            value={formData.phoneNo}
                            placeholder='Phone number' />
                        <input
                            onChange={handleChange}
                            type="password"
                            className="input"
                            name="password"
                            value={formData.password}
                            placeholder='Password' />
                    </div>
                    <button disabled={status === "submitting"} className="btn">
                        {status === "submitting" ? "Signing Up" : "Sign Up"}
                    </button>

                    <button onClick={signInWithGoogle} disabled={status === "submitting"} className="btn">
                                            <img className="btn-google-icon" src={googleIcon} alt="" />
                                            {status === "submitting" ? "Signing Up" : "Sign Up with Google"}
                                        </button>
                </form>

                <p>Already have an account. <Link to={"/signin"}>Sign In</Link></p>

            </div>

        </div>
    )
}

export default SignUp