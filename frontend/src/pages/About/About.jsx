import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

import './About.css';

const Home = () => {

    return (
        <>
            <Layout />
            <section className="banner-area relative about-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="about-content col-lg-12">
                            <h1 className="text-white">
                                About Us
                            </h1>
                            <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right"></span>  <a href="/about"> About Us</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-about-area section-gap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 about-left">
                            <img className="img-fluid" src="../img/about-img.jpg" alt="" />
                        </div>
                        <div className="col-lg-6 about-right">
                            <h1>Empowering Your Journeys with LANKA CABZ</h1>
                            <h4>Experience seamless, reliable, and comfortable travel with LANKA CABZ.</h4>
                            <p>
                                At LANKA CABZ, we're more than just a transportation service. We're your trusted partner in empowering seamless, reliable, and comfortable journeys. With a commitment to excellence, safety, and customer satisfaction, we strive to redefine your travel experiences. From city rides to airport transfers, corporate travel to special events, our dedicated team ensures that every ride with LANKA CABZ is a journey worth remembering. Join us as we embark on this road together, making travel not just a necessity, but an enjoyable experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="image-gallery-area section-gap">
                <div className="container">
                    <div className="row section-title">
                        <h1>Empowering Journeys: Discover LANKA CABZ</h1>
                        <p>Your Partner for Reliable and Comfortable Transportation</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <h3>City Rides</h3>
                                <h6>Explore with Ease: City Rides by LANKA CABZ</h6>
                                <p>
                                    Navigate urban landscapes effortlessly with LANKA CABZ. Our city rides offer quick and reliable transportation for all your errands and short trips within city limits. Whether you're running errands, meeting friends, or exploring local attractions, trust LANKA CABZ to get you there safely and on time.
                                </p>
                            </div>

                            <div className='sub-about-area'>
                                <h3>Airport Transfers</h3>
                                <h6>Seamless Airport Travel with LANKA CABZ</h6>
                                <p>
                                    Make your airport journey stress-free with LANKA CABZ. Our seamless airport transfer services ensure prompt and efficient pickups and drop-offs, so you can relax and enjoy your travel experience. Whether you're arriving or departing, trust LANKA CABZ for reliable transportation to and from the airport.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <h3>Outstation Trips</h3>
                                <h6>Discover Beyond City Limits: Outstation Trips by LANKA CABZ</h6>
                                <p>
                                    Experience the freedom to explore beyond city boundaries with LANKA CABZ. Our outstation trips offer comfortable rides for long-distance travel to neighboring towns or attractions. Whether it's a weekend getaway or a day trip, trust LANKA CABZ to take you there safely and in style.
                                </p>
                            </div>

                            <div className='sub-about-area'>
                                <h3>Corporate Transport</h3>
                                <h6>Efficient Business Travel Solutions by LANKA CABZ</h6>
                                <p>
                                    Streamline your business travel with LANKA CABZ. Our corporate transport services offer tailored solutions for business travelers, ensuring punctual service and professional chauffeurs. Whether it's attending meetings, conferences, or corporate events, trust LANKA CABZ for efficient and reliable transportation.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 single-gallery">
                            <div className='sub-about-area'>
                                <h3>Special Events</h3>
                                <h6>Elevate Your Occasions with LANKA CABZ</h6>
                                <p>
                                    Make your special occasions unforgettable with LANKA CABZ. Whether it's a wedding, party, or other celebration, our special events transportation services ensure elegant rides for you and your guests. Trust LANKA CABZ to add an extra touch of luxury and comfort to your memorable moments.
                                </p>
                            </div>

                            <div className='sub-about-area'>
                                <h3>Medical Assistance</h3>
                                <h6>Reliable Transport for Medical Appointments by LANKA CABZ</h6>
                                <p>
                                    Reach your medical appointments with ease and peace of mind with LANKA CABZ. Our reliable transportation services for medical appointments ensure safe and comfortable rides for patients. Whether it's a routine check-up or a medical procedure, trust LANKA CABZ to get you there on time, every time.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="reviews-area section-gap">
                <div className="container">
                    <div className="row section-title">
                        <h1>Client’s Reviews</h1>
                        <p>Who are in extremely love with eco friendly system.</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-review">
                                <h4>Cody Hines</h4>
                                <p>
                                    Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker.
                                </p>
                                <div className="star">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-review">
                                <h4>Chad Herrera</h4>
                                <p>
                                    Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker.
                                </p>
                                <div className="star">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-review">
                                <h4>Andre Gonzalez</h4>
                                <p>
                                    Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker.
                                </p>
                                <div className="star">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-review">
                                <h4>Jon Banks</h4>
                                <p>
                                    Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker.
                                </p>
                                <div className="star">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-review">
                                <h4>Landon Houston</h4>
                                <p>
                                    Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker.
                                </p>
                                <div className="star">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-review">
                                <h4>Nelle Wade</h4>
                                <p>
                                    Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker.
                                </p>
                                <div className="star">
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star checked"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

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
            <Footer />
        </>
    )
}

export default Home;