import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate()


    const getProtectedData = async (accessToken) => {
        try {
            const response = await axios.get('https://lanka-cabs.onrender.com/protected', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
        }
    }, [])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(token);
                    console.log(user);
                    setUser(user);

                } catch (error) {
                    console.log(error);

                }
            };

            fetchData();
        }
    }, [token]);

    return (
        <header id="header">
            <div className="header-top">
            </div>
            <div className="container main-menu">
                <div className="row align-items-center justify-content-between d-flex">
                    <a href="/"><img className='header-logo' src="img/lanka-cabz-logo.png" alt="" title="" /></a>
                    <nav id="nav-menu-container">
                        <ul className="nav-menu nav-menu-ul">
                            <li className="menu-active"><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/services">Services</a></li>

                            {/* <li className="menu-has-children"><a href="">Blog</a>
                                <ul>
                                    <li><a href="blog-home.html">Blog Home</a></li>
                                    <li><a href="blog-single.html">Blog Single</a></li>
                                    <li className="menu-has-children"><a href="">Level 2</a>
                                        <ul>
                                            <li><a href="#">Item One</a></li>
                                            <li><a href="#">Item Two</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li> */}

                            {/* <li><a href="/contact-us">Contact</a></li> */}
                            {!user && <li><a href="/log-in" className="btn header-login-btn">LOGIN</a></li>}
                            {user &&
                                <li className="menu-has-children">
                                    <a href="#" className='profile-btn'>
                                        <i className='fa fa-user'></i>
                                    </a>
                                    <ul>
                                        <li><a href="/Dashboard" className='text-white'><i className='fa fa-dashboard mr-1'></i> DASHBOARD</a></li>
                                        <li
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                navigate("/log-in")
                                            }}><a href="" className='text-danger'><i className='fa fa-sign-out mr-1'></i> LOGOUT</a></li>
                                    </ul>
                                </li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header