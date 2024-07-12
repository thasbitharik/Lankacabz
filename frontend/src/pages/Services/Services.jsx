import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Services = () => {

    return (
        <>
            <Layout />
            <section className="banner-area relative about-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="about-content col-lg-12">
                            <h1 className="text-white">
                                Services
                            </h1>
                            <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right"></span>  <a href="/services"> Services</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-area section-gap">
                <div className="container">
                    <div className="row section-title">
                        <h1>What Services we offer to our clients</h1>
                        <p>Effortless Travel Solutions for Every Occasion.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 single-service">
                            <span className="lnr lnr-car"></span>
                            <a href="#"><h4>City Rides</h4></a>
                            <p>
                                Explore your city with ease. Book a cab for short trips or errands within the city limits.
                            </p>
                        </div>
                        <div className="col-lg-4 single-service">
                            <span className="lnr lnr-clock"></span>
                            <a href="#"><h4>24/7 Availability</h4></a>
                            <p>
                                Round-the-clock service to cater to your travel needs anytime, anywhere.
                            </p>
                        </div>
                        <div className="col-lg-4 single-service">
                            <span className="lnr lnr-home"></span>
                            <a href="#"><h4>Safety Measures</h4></a>
                            <p>
                                Your safety is our priority. Our drivers are trained professionals ensuring a secure journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-calltoaction-area relative">
                <div className="container">
                    <div className="overlay overlay-bg"></div>
                    <div className="row align-items-center section-gap">
                        <div className="col-lg-12">
                            <h1 className='text-center'>Redefining Transportation: LANKA CABZ</h1>
                            <p className='text-center'>
                                Experience comfort, reliability, and convenience with LANKA CABZ, your trusted transportation partner. From city rides to airport transfers, we ensure seamless journeys every time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-about-area section-gap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 about-left">
                            <img className="img-fluid" src="img/about-img.jpg" alt="" />
                        </div>
                        <div className="col-lg-6 about-right">
                            <h1>Experience Convenience with LANKA CABZ</h1>
                            <h4>Your Reliable Transport: LANKA CABZ</h4>
                            <p>
                                At LANKA CABZ, we're dedicated to providing you with the utmost convenience in transportation. Whether you need a quick city ride, a hassle-free airport transfer, or a comfortable journey to an outstation destination, we've got you covered. Our commitment to reliability means you can trust us to be there when you need us, every time.
                            </p>

                            <p>
                                With a focus on safety and comfort, our professional drivers ensure that your journey with LANKA CABZ is not just convenient, but also enjoyable. Our fleet of well-maintained vehicles is equipped to meet your diverse needs, whether you're traveling alone or with a group.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Services;