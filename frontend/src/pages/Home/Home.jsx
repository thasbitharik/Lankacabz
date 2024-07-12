import React, { useEffect, useState } from 'react';
import './Home.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [toLocations, setToLocations] = useState([]);
    const [fromLocations, setFromLocations] = useState([]);

    const [filteredLocations, setFilteredLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    const [filteredToLocations, setFilteredToLocations] = useState([]);
    const [selectedToLocation, setSelectedToLocation] = useState('');

    const [routeDetail, setRouteDetail] = useState([]);
    const [showDateAndTime, setShowDateAndTime] = useState(false);

    const [extractedDate, setExtractedDate] = useState('');
    const [extractedTime, setExtractedTime] = useState('');
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [driverId, setDriverId] = useState("");
    const [money, setMoney] = useState("");
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);


    const handleChange = date => {
        setSelectedDate(date);
    };
    function smoothScroll(target) {
        const targetElement = document.getElementById(target);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }

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
    }, [token])

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

    useEffect(() => {
        const dateTime = new Date(selectedDate);
        const extractedDate = dateTime.toDateString(); // Extracting date
        const extractedTime = dateTime.toLocaleTimeString(); // Extracting time

        setExtractedDate(extractedDate);
        setExtractedTime(extractedTime);
    }, [selectedDate]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue) {
            setSelectedLocation(inputValue); // Update selectedLocation state
            const filtered = fromLocations.filter(location =>
                location.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setSelectedLocation("")
            setFilteredLocations([])
        }

    };

    // Function to handle click on filtered location
    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        setFilteredLocations([]);
    };

    const handleToInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue) {
            setSelectedToLocation(inputValue); // Update selectedLocation state
            const filtered = toLocations.filter(location =>
                location.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredToLocations(filtered);
        } else {
            setSelectedToLocation("")
            setFilteredToLocations([])
        }

    };

    // Function to handle click on filtered location
    const handleToLocationClick = (location) => {
        setSelectedToLocation(location);
        setFilteredToLocations([]);
    };

    useEffect(() => {

        axios.get("https://lanka-cabs.onrender.com/find-from-routes")
            .then(res => {
                console.log(res.data)
                setFromLocations(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        axios.get("https://lanka-cabs.onrender.com/find-to-routes")
            .then(res => {
                console.log(res.data)
                setToLocations(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const handleRouteDetail = () => {
        setRouteDetail([])
        axios.get(`https://lanka-cabs.onrender.com/route-detail/${selectedLocation}/${selectedToLocation}`)
            .then(res => {
                console.log(res.data);
                setRouteDetail(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const renderStars = (numStars) => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(<i key={i} className='fa fa-star rate'></i>);
        }
        for (let i = numStars; i < 5; i++) {
            stars.push(<i key={i} className='fa fa-star'></i>);
        }
        return stars;
    };

    const handleBooking = () => {
        const bookingData = {
            driverId,
            time: extractedTime,
            date: extractedDate,
            customerId: user.id,
            from,
            to,
            money,
            pickUpLocation

        }

        axios.post("https://lanka-cabs.onrender.com/create-new-booking", bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <Layout />
            <section className="banner-area relative" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row fullscreen d-flex align-items-center justify-content-between">
                        <div className="banner-content col-lg-6 col-md-6 ">
                            <h6 className="text-white ">Seamless Transportation Solutions</h6>
                            <h1 className="text-uppercase">
                                Ride in Style, Arrive in Comfort
                            </h1>
                            <p className="pt-10 pb-10 text-white">
                                Experience Seamless Transportation Solutions with LANKA CABZ
                            </p>
                            <a
                                href="#about"
                                className="primary-btn text-uppercase"
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScroll("about");
                                }}
                            >
                                Get Started
                            </a>
                        </div>
                        <div className="col-lg-4  col-md-6 header-right">
                            <h4 className="pb-30 home-text-title">Book Your Taxi Online!</h4>
                            <form className="form">
                                <div className="from-group mb-4">
                                    <div className='relative'>
                                        <label htmlFor="from" className='home-book-input-label'>From</label>
                                        <input className="form-control txt-field home-book-input mb-0" type="text" name="from" placeholder="Search Location"
                                            value={selectedLocation}
                                            onChange={handleInputChange} required />

                                        <div className='search-result-data-area custom'>
                                            {filteredLocations.map((location, index) => (
                                                <div
                                                    key={index}
                                                    className='search-result-data'
                                                    onClick={() => handleLocationClick(location)}
                                                >
                                                    {location}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <div className="from-group mb-4">
                                    <div className='relative'>
                                        <label htmlFor="from" className='home-book-input-label'>To</label>
                                        <input className="form-control txt-field home-book-input mb-0" type="text" name="to" placeholder="Search Location"
                                            value={selectedToLocation}
                                            onChange={handleToInputChange} required />

                                        <div className='search-result-data-area custom'>
                                            {filteredToLocations.map((location, index) => (
                                                <div
                                                    key={index}
                                                    className='search-result-data'
                                                    onClick={() => handleToLocationClick(location)}
                                                >
                                                    {location}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type='button' className="btn btn-default btn-lg btn-block text-center text-uppercase make-reserve-btn" data-toggle="modal" data-target="#exampleModal"
                                        onClick={handleRouteDetail} disabled={!(selectedLocation && selectedToLocation)}>SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-about-area section-gap" id='about'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 about-left">
                            <img className="img-fluid" src="img/about-img.jpg" alt="" />
                        </div>
                        <div className="col-lg-6 about-right">
                            <h1>Empowering Your Journeys with LANKA CABZ</h1>
                            <h4>Experience seamless, reliable, and comfortable travel with LANKA CABZ.</h4>
                            <p>
                                At LANKA CABZ, we're more than just a transportation service. We're your trusted partner in empowering seamless, reliable, and comfortable journeys. With a commitment to excellence, safety, and customer satisfaction, we strive to redefine your travel experiences. From city rides to airport transfers, corporate travel to special events, our dedicated team ensures that every ride with LANKA CABZ is a journey worth remembering. Join us as we embark on this road together, making travel not just a necessity, but an enjoyable experience.
                            </p>
                            <a className="text-uppercase primary-btn" href="/about">View More</a>
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

            {/* booking modal here */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content dark-theme">
                        <div class="modal-header dark-theme">
                            <h5 class="modal-title text-orange" id="exampleModalLabel">Booking</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className='text-danger'>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body dark-theme">
                            {/* selected locations here */}
                            <div className="selected-location-area">
                                <div className="row">
                                    <div className="col-6">
                                        <div className='selected-location'>
                                            <h6 className='text-orange'>From : </h6>
                                            <h6 className='text-white sub-text'>{selectedLocation}</h6>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='selected-location'>
                                            <h6 className='text-orange'>To : </h6>
                                            <h6 className='text-white sub-text'>{selectedToLocation}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  */}

                            {/* driver details here */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="">
                                        <table className="table table-borderd bg-white modal-table dark-theme">
                                            <thead>
                                                <tr className='bg-black'>
                                                    <th>No.</th>
                                                    <th>Driver Name</th>
                                                    <th>Mobile Number</th>
                                                    <th>Amount</th>
                                                    <th>Rating</th>
                                                    {user?.role === "Customer" && <th className='text-center'>Select</th>}
                                                </tr>
                                            </thead>
                                            {routeDetail.length > 0 ?
                                                <tbody>
                                                    {routeDetail.map((rout, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}.</td>
                                                            <td>{rout?.driver?.userName}</td>
                                                            <td>{rout?.driver?.phoneNum}</td>
                                                            <td>{rout?.money}</td>
                                                            <td className='verical-align-middle'>
                                                                <div className="current-rating">
                                                                    {renderStars(rout?.driver?.rating)}
                                                                </div>
                                                            </td>
                                                            {user?.role === "Customer" && <td className='text-center'>
                                                                <button
                                                                    className='btn no-radius view-btn btn-success'
                                                                    onClick={() => {
                                                                        setSelectedRowIndex(index);
                                                                        setShowDateAndTime(true);
                                                                        setDriverId(rout?.driver?.id);
                                                                        setTo(rout?.to);
                                                                        setFrom(rout?.from);
                                                                        setMoney(rout?.money);
                                                                    }}
                                                                    disabled={selectedRowIndex === index} // Disable if this row is selected
                                                                >
                                                                    <i className='fa fa-check mr-2'>Select</i>
                                                                </button>
                                                            </td>}
                                                        </tr>
                                                    ))}
                                                </tbody> :
                                                <tr>
                                                    <td colSpan={6} className='text-center text-secondary'>No Driver Details!</td>
                                                </tr>
                                            }

                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/*  */}

                            {/* booking form here */}
                            {showDateAndTime &&
                                <div className="row">
                                    <div className="col-12">
                                        <form action="">
                                            <div className='book-form-area'>
                                                <div className="row">
                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="" className='form-label absolute text-orange'>Pickup Location</label>
                                                            <input type="text" className='form-control dark-theme' placeholder='Enter your pickup location'
                                                                value={pickUpLocation}
                                                                onChange={(e) => setPickUpLocation(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-6">
                                                        <div className="form-group">
                                                            <label htmlFor="" className='form-label absolute text-orange'>Date & Time</label>
                                                            <div className='w-100 date-picker-custom'>
                                                                <DatePicker
                                                                    className='form-control dark-theme'
                                                                    placeholderText='Select Date and Time'
                                                                    selected={selectedDate}
                                                                    onChange={handleChange}
                                                                    showTimeSelect
                                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>}
                            {/*  */}

                        </div>
                        <div class="modal-footer dark-theme">
                            {!(user?.role === "Customer") && <button class="btn no-radius btn-orange" data-dismiss="modal"
                                onClick={() => navigate("/log-in")}>Please login as Customer to Book....</button>}
                            <button type="button" class="btn no-radius btn-secondary" data-dismiss="modal">Close</button>
                            {user?.role === "Customer" && <button type="button" class="btn no-radius btn-orange"
                                onClick={() => handleBooking()}
                                disabled={routeDetail.length === 0}>Book</button>}

                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
        </>
    )
}

export default Home;
