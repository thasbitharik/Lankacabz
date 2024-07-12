import React from 'react';
import './index.css'

export const Footer = () => {
    return (
        <footer className="footer-area footer-section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <a href="/">
                                <img className='footer-logo' height="70" src="../img/lanka-cabz-logo-lg.png" alt="" title="" />
                            </a>
                            <div className='mt-3'>
                                <p className='text-white'>
                                    LANKA CABZ - Where convenience meets reliability. Enjoy seamless taxi booking with our user-friendly app. From quick city rides to airport transfers, we've got you covered. Count on our professional drivers for a safe and comfortable journey every time. Your travel satisfaction, our commitment.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h6>Quick links</h6>
                            <ul>
                                <li><a href="/about" className='text-orange footer-links'>About Us</a></li>
                                <li><a href="/services" className='text-orange footer-links'>Services</a></li>
                                {/* <li><a href="#">Investor Relations</a></li>
                                <li><a href="#">Terms of Service</a></li> */}
                            </ul>
                        </div>
                    </div>
                    <p className="mt-80 mx-auto footer-text col-lg-12">
                        {/* Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a> */}
                    </p>
                </div>
            </div>
            <img className="footer-bottom" src="../img/footer-bottom.png" alt="" />
        </footer>
    )
}

export default Footer;