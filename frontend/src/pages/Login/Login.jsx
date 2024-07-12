import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const intialCredentials = {
        userName: "",
        password: "",
        role: ""
    }
    const [credentials , setCredentials] = useState(intialCredentials);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulation!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(credentials)
        let endPoint;
        if(credentials.role === "Admin"){
            endPoint = "login-admin"
        }else if(credentials.role === "Customer"){
            endPoint = "login-customer"
        }else if(credentials.role === "Driver"){
            endPoint = "login-driver"
        }else if (credentials.role === "Operator"){
            endPoint = "login-operator"
        }

        console.log(endPoint);
        
        axios.post(`https://lanka-cabs.onrender.com/${endPoint}`, credentials)
            .then(res=>{
                console.log(res.data);
                showSuccessMessage("Login Successful!")
                setCredentials(intialCredentials);
                if (credentials.role === "Customer") {
                    localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                    navigate(`/`);
                }else  {
                    localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                    navigate(`/dashboard`);
                }
            })
            .catch(err=>{
                console.log(err)
                showErrorMessage("Login failed!")
            })

    }

    return (
        <>
            <Layout />
            <section className="banner-area relative about-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="about-content col-lg-12">
                            <h1 className="text-white">
                                Login
                            </h1>
                            <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right"></span>  <a href="/log-in"> Login</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='login-section section-gap'>
                <div className="container">
                    <div className="row login-form-section">
                        <div className="col-12 col-md-6 col-lg-4 mx-auto login-form-area">
                            <div className="">
                                <h4 className='text-center mb-4'>LOGIN</h4>
                                <hr />
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="user_name" className='form-label'>User Name</label>
                                        <input name="userName" placeholder="Enter your user name" className="common-input mb-20 form-control login-input" required="" type="text" 
                                        value={credentials.userName}
                                        onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className='form-label'>Password</label>
                                        <input name="password" placeholder="Enter password" className="common-input mb-20 form-control login-input" required="" type="password" 
                                        value={credentials.password}
                                        onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="role" className='form-label'>Select Role</label>

                                        <div className="radio-inputs">
                                            <label className="radio">
                                                <input type="radio" name="role" value="Admin" 
                                                onChange={handleInputChange} />
                                                <span className="name">Admin</span>
                                            </label>
                                            <label className="radio">
                                                <input type="radio" name="role" value="Operator" 
                                                onChange={handleInputChange}/>
                                                <span className="name">Operator</span>
                                            </label>

                                            <label className="radio">
                                                <input type="radio" name="role" value="Customer" 
                                                onChange={handleInputChange}/>
                                                <span className="name">Customer</span>
                                            </label>

                                            <label className="radio">
                                                <input type="radio" name="role" value="Driver" 
                                                onChange={handleInputChange}/>
                                                <span className="name">Driver</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="alert-msg text-left"></div>
                                        <button className="btn login-btn"
                                        onClick={handleSubmit}>LOGIN</button>
                                        <div className='dont-acc-text'>Don't have an account,&nbsp;
                                            <a href="/sign-up">Signup</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Login;