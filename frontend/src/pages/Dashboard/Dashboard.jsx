import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [allBookings, setAllBookings] = useState([]);
    const [bookingUserDetail, setBookinguserDetail] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [responseUsers, setResponseUsers] = useState();
    const [selecteValue, setSelecteValue] = useState("Customer");
    const [allRoutes, setAllRoutes] = useState([]);

    const initialRouteDetail = {
        fromLocation: "",
        toLocation: "",
        amount: ""
    }
    const [routeDetail, setRouteDetail] = useState(initialRouteDetail)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRouteDetail({ ...routeDetail, [name]: value });
    }

    const handleRouteCreate = (event) => {
        event.preventDefault();
        const data = {
            from: routeDetail.toLocation,
            to: routeDetail.fromLocation,
            money: routeDetail.amount,
            driverId: user?.id
        }
        axios.post(`https://lanka-cabs.onrender.com/create-new-route-for-driver`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                showSuccessMessage("New Route Created")
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success',
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
        } else {
            setLoading(false); // No token, so stop loading
            navigate('/log-in'); // Navigate to login page
        }
    }, [])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(token);
                    console.log(user);
                    setUser(user);
                    setLoading(false)
                } catch (error) {
                    console.log(error);
                    setLoading(false)
                }
            };

            fetchData();
        }
    }, [token]);

    const GetBookings = async (endPoint) => {
        try {
            const response = await axios.get(`https://lanka-cabs.onrender.com/${endPoint}`, {
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
        const fetchBookings = async () => {
            try {
                if (user?.role === "Driver") {
                    const bookings = await GetBookings(`booking/${user.id}`);
                    console.log(bookings);
                    setAllBookings(bookings)
                } else if (user?.role === "Customer") {
                    const bookings = await GetBookings(`bookings-customer/${user.id}`);
                    console.log(bookings);
                    setAllBookings(bookings)
                } else if (user?.role === "Admin") {
                    const bookings = await GetBookings(`all-bookings-with-customer-driver-details`);
                    console.log(bookings);
                    setAllBookings(bookings)
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, [user]);

    const handleBookingUser = (Customer, Driver) => {
        setBookinguserDetail({
            Customer,
            Driver
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

    const handleRating = (id, num) => {
        console.log(id, num)

        const driverId = id
        const ratingNum = num

        axios.patch(`https://lanka-cabs.onrender.com/update-driver-rating`, { driverId, ratingNum }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                showSuccessMessage("Rating Sent");
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                showErrorMessage();
            })
    }

    const handleConfirm = (id) => {
        axios.patch(`https://lanka-cabs.onrender.com/confirm-booking/${id}`, { id }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                showSuccessMessage("Booking confirmed")
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    const handleChangeAvailability = (driverId) => {
        axios.patch(`https://lanka-cabs.onrender.com/changing-availability-driver`, { driverId }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data)
                showSuccessMessage("Availability Status Changed")
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                showErrorMessage()
            })
    }

    useEffect(() => {
        if (token) {
            axios.get(`https://lanka-cabs.onrender.com/all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data)
                    setResponseUsers(res.data)
                    if (selecteValue === "Customer") {
                        setAllUsers(res.data?.allCustomer)
                    }
                })
                .catch(err => {
                    console.log(err)
                })


        }

    }, [token])

    useEffect(() => {
        if (user?.role === "Driver") {
            axios.get(`https://lanka-cabs.onrender.com/all-routes-driver/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data)
                    setAllRoutes(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [user])

    useEffect(() => {
        if (selecteValue === "Customer") {
            setAllUsers(responseUsers?.allCustomer)
        } else if (selecteValue === "Driver") {
            setAllUsers(responseUsers.allDriver)
        } else if (selecteValue === "Operator") {
            setAllUsers(responseUsers.allOperator)
        }
    }, [selecteValue])

    return (
        <>
            {loading ? <div className="dot-spinner-area">
                <div className="dot-spinner">
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                </div>
            </div> :
                (user ? <>
                    <Layout />
                    <section className="banner-area relative about-banner" id="home">
                        <div className="overlay overlay-bg"></div>
                        <div className="container">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="about-content col-lg-12">
                                    <h1 className="text-white">
                                        Dashboard
                                    </h1>
                                    <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right"></span>  <a href="/dashboard"> Dashboard</a></p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='login-section section-gap'>
                        <div className="container">
                            <div className="row login-form-section">
                                <div className="col-12 login-form-area">
                                    <div className="">
                                        <h4 className='text-center mb-4'>PROFILE</h4>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                                                <div className='user-icon'>
                                                    <i className='fa fa-user'></i>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <div className="row p-2">
                                                    <div className="col-5">
                                                        <h6 className=''>User Name</h6>
                                                    </div>
                                                    <div className="col-7">
                                                        <h6 className='text-secondary sub-text'>{user.userName}</h6>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row p-2">
                                                    <div className="col-5">
                                                        <h6 className=''>E-Mail</h6>
                                                    </div>
                                                    <div className="col-7">
                                                        <h6 className='text-secondary sub-text'>{user.email}</h6>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row p-2">
                                                    <div className="col-5">
                                                        <h6 className=''>Mobile</h6>
                                                    </div>
                                                    <div className="col-7">
                                                        <h6 className='text-secondary sub-text'>{user.phoneNum}</h6>
                                                    </div>
                                                </div>
                                                {user?.role === "Driver" &&
                                                    <>
                                                        <hr />
                                                        <div className="row p-2">
                                                            <div className="col-5">
                                                                <h6 className=''>Current Rating</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="current-rating">
                                                                    {renderStars(user?.rating)}
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <hr />
                                                        <div className="row p-2">
                                                            <div className="col-5">
                                                                <h6 className=''>Availability</h6>
                                                            </div>
                                                            <div className="col-7 d-flex justify-content-between align-items-end gap-10">
                                                                <div className="radio-inputs">
                                                                    <label className="radio">
                                                                        <input type="radio" name="role" value="true" checked={user?.availability} />
                                                                        <span className="name success">Available</span>
                                                                    </label>

                                                                    <label className="radio">
                                                                        <input type="radio" name="role" value="false" checked={!(user?.availability)} />
                                                                        <span className="name danger">Not Available</span>
                                                                    </label>
                                                                </div>

                                                                <div className='text-right'>
                                                                    <button type='button' className='btn no-radius btn-success change-status-btn'
                                                                        onClick={() => handleChangeAvailability(user?.id)}>Change</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {allBookings?.length > 0 ?
                                    <div className="col-12 login-form-area mt-4">
                                        <div className="">
                                            <h4 className='text-center mb-4'>BOOKINGS</h4>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive">
                                                        <table className="table table-borderd bg-white">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Date</th>
                                                                    <th>Time</th>
                                                                    <th>From</th>
                                                                    <th>To</th>
                                                                    <th>Amount</th>
                                                                    <th className='text-center'>Status</th>
                                                                    <th className='text-center'>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {allBookings.map((book, index) => {
                                                                    const cusDetail = book?.customerDetatls;
                                                                    const driverDeta = book?.driverDetails;

                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}.</td>
                                                                            <td>{book?.bookingDetails?.date}</td>
                                                                            <td>{book?.bookingDetails?.time}</td>
                                                                            <td>{book?.bookingDetails?.from}</td>
                                                                            <td>{book?.bookingDetails?.to}</td>
                                                                            <td>{book?.bookingDetails?.money}</td>
                                                                            <td className='text-center'>
                                                                                {/* <span className="booking-status pending">Pending</span> */}
                                                                                <span className={`booking-status ${book?.bookingDetails?.status == "Completed" ? "completed" : "pending"}`}>{book?.bookingDetails?.status}</span>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <button className='btn view-btn' data-toggle="modal" data-target="#exampleModal"
                                                                                    onClick={() => handleBookingUser(cusDetail, driverDeta)}
                                                                                >
                                                                                    <i className='fa fa-eye'></i>
                                                                                </button>

                                                                                {(user?.role === "Driver" && book?.bookingDetails?.status == "Pending") &&
                                                                                    <button className='btn view-btn btn-success ml-2'
                                                                                        onClick={() => handleConfirm(book?.bookingDetails?.id)}>
                                                                                        Confirm
                                                                                    </button>
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}


                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="no-data-created-area">
                                        <div className='no-data-created'>
                                            <div className='no-data-text'>No Bookings Found!</div>
                                        </div>
                                    </div>}

                                {(user?.role === "Admin" && allUsers?.length > 0) &&
                                    <div className="col-12 login-form-area mt-4">
                                        <div className="">
                                            <h4 className='text-center mb-4'>USERS</h4>
                                            <div className="bg-white p-3 mb-3">
                                                <div className="row">
                                                    <div className="col-7 m-auto">
                                                        <h6 className='text-dark mb-0'>Select User:</h6>
                                                    </div>
                                                    <div className="col-5">
                                                        <select className='form-control' value={selecteValue}
                                                            onChange={(e) => setSelecteValue(e.target.value)}>
                                                            {/* <option value="">-- Select User --</option> */}
                                                            <option value="Customer" selected>Customer</option>
                                                            <option value="Driver">Driver</option>
                                                            <option value="Operator">Operator</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">

                                                    <div className="table-responsive">
                                                        <table className="table table-borderd bg-white">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Name</th>
                                                                    <th>E-Mail</th>
                                                                    <th>Mobile</th>
                                                                    <th>Role</th>
                                                                    {selecteValue === "Driver" &&
                                                                        <>
                                                                            <th className='text-center'>Availability</th>
                                                                            <th>Rating</th>
                                                                        </>}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {allUsers.map((user, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}.</td>
                                                                            <td>{user?.userName}</td>
                                                                            <td>{user?.email}</td>
                                                                            <td>{user?.phoneNum}</td>
                                                                            <td>{user?.role}</td>
                                                                            {user?.role === "Driver" &&
                                                                                <>
                                                                                    <td className='text-center'>
                                                                                        {user?.availability ? <span className="booking-status completed">Available</span> :
                                                                                            <span className="booking-status pending">Not Available</span>}
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="current-rating">
                                                                                            {renderStars(user?.rating)}
                                                                                        </div>
                                                                                    </td>
                                                                                </>}

                                                                        </tr>
                                                                    )
                                                                })}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {(user.role === "Driver") &&
                                <div className="col-12 login-form-area mt-4">
                                    <div className="">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <h4 className='text-center mb-0'>ROUTE CHARGES</h4>
                                            <button className='btn btn-sm btn-success' data-toggle="modal" data-target="#routeCharegeModal">
                                                <i className='fa fa-plus mr-2'></i>
                                                Create New
                                            </button>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-12">

                                                <div className="table-responsive">
                                                    <table className="table table-borderd bg-white">
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>From</th>
                                                                <th>To</th>
                                                                <th>Amount</th>
                                                            </tr>
                                                        </thead>
                                                        {allRoutes?.length>0 ?
                                                            <tbody>
                                                            {allRoutes?.map((routesCharge, index)=>{
                                                                return(
                                                                    <tr>
                                                                        <td>{index+1}.</td>
                                                                        <td>{routesCharge?.from}</td>
                                                                        <td>{routesCharge?.to}</td>
                                                                        <td>{routesCharge?.money}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            
                                                        </tbody> :
                                                        <tr>
                                                        <td colSpan={4} className='text-center text-secondary'>No Data found!</td>
                                                    </tr>
                                                        }
                                                        
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section>

                    <Footer />

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-orange" id="exampleModalLabel">User Information</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body bg-gray">
                                    {bookingUserDetail?.Customer &&
                                        <>
                                            <h6 className='pb-3 text-success'>Customer Information</h6>
                                            <div className='bg-white pt-4 pb-4 pl-3 pr-3'>
                                                <div className="row">
                                                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                                                        <div className='user-icon'>
                                                            <i className='fa fa-user'></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-8">
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>UserName</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <h6 className='text-secondary sub-text'>{bookingUserDetail?.Customer?.userName}</h6>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>E-Mail</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <h6 className='text-secondary sub-text'>{bookingUserDetail?.Customer?.email}</h6>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>Mobile</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <h6 className='text-secondary sub-text'>{bookingUserDetail?.Customer?.phoneNum}</h6>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    }
                                    {bookingUserDetail?.Driver &&
                                        <>
                                            <h6 className='pb-3 text-info'>Driver Information</h6>
                                            <div className='bg-white pt-4 pb-4 pl-3 pr-3'>
                                                <div className="row">
                                                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center">
                                                        <div className='user-icon'>
                                                            <i className='fa fa-user'></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-8">
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>UserName</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <h6 className='text-secondary sub-text'>{bookingUserDetail?.Driver?.userName}</h6>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>E-Mail</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <h6 className='text-secondary sub-text'>{bookingUserDetail?.Driver?.email}</h6>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>Mobile</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <h6 className='text-secondary sub-text'>{bookingUserDetail?.Driver?.phoneNum}</h6>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>Availability</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                {(bookingUserDetail?.Driver?.availability) ? <h6 className='text-success sub-text'>Available</h6> :
                                                                    <h6 className='text-warning sub-text'>Not Available</h6>}

                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <h6 className=''>Current Rating</h6>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="current-rating">
                                                                    {renderStars(bookingUserDetail?.Driver?.rating)}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row pl-2 pr-2">
                                                <div className="col-12 col-md-6 my-auto">
                                                    <h6 className='mb-0'>Rating</h6>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <div className="form-group mt-2">
                                                        <div class="rating">
                                                            <input value="5" name="rate" id="star5" type="radio"
                                                                onChange={() => handleRating(bookingUserDetail?.Driver?.id, 5)} />
                                                            <label title="text" for="star5"></label>
                                                            <input value="4" name="rate" id="star4" type="radio"
                                                                onChange={() => handleRating(bookingUserDetail?.Driver?.id, 4)} />
                                                            <label title="text" for="star4"></label>
                                                            <input value="3" name="rate" id="star3" type="radio"
                                                                onChange={() => handleRating(bookingUserDetail?.Driver?.id, 3)} />
                                                            <label title="text" for="star3"></label>
                                                            <input value="2" name="rate" id="star2" type="radio"
                                                                onChange={() => handleRating(bookingUserDetail?.Driver?.id, 2)} />
                                                            <label title="text" for="star2"></label>
                                                            <input value="1" name="rate" id="star1" type="radio"
                                                                onChange={() => handleRating(bookingUserDetail?.Driver?.id, 1)} />
                                                            <label title="text" for="star1"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* route charges modal here */}
                    <div class="modal fade" id="routeCharegeModal" tabindex="-1" aria-labelledby="routeCharegeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-orange" id="routeCharegeModalLabel">Create</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body bg-gray">
                                    <form>
                                        <div class="form-group row mb-4">
                                            <label for="from_location" class="col-sm-2 col-form-label text-dark font-weight-500">From :</label>
                                            <div class="col-sm-10">
                                                <input type="text" name='fromLocation' className='form-control' placeholder='Enter Location'
                                                    value={routeDetail.fromLocation}
                                                    onChange={handleInputChange} />
                                            </div>
                                        </div>

                                        <div class="form-group row mb-4">
                                            <label for="to_location" class="col-sm-2 col-form-label text-dark font-weight-500">To :</label>
                                            <div class="col-sm-10">
                                                <input type="text" name='toLocation' className='form-control' placeholder='Enter Location'
                                                    value={routeDetail.toLocation}
                                                    onChange={handleInputChange} />
                                            </div>
                                        </div>

                                        <div class="form-group row mb-0">
                                            <label for="amount" class="col-sm-2 col-form-label text-dark font-weight-500">Amount (LKR) :</label>
                                            <div class="col-sm-10">
                                                <input type="text" name='amount' className='form-control' placeholder='Enter Amount'
                                                    value={routeDetail.amount}
                                                    onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-success"
                                        onClick={handleRouteCreate}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </> :
                    <div className="dot-spinner-area">
                        <div className="dot-spinner">
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                        </div>
                    </div>
                )}

        </>

    )
}

export default Dashboard;