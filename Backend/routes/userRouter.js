const router = require("express").Router();
const {
    createCustomer,
    userLogin,
    findAllUsersForAdmin,
    fromToRouteMoneyAdd,
    findAllDrivers,
    routeDetail,
    getAllCreatedFrom,
    getAllCreatedTo,
    createBooking,
    getAllBookings,
    confirmBooking,
    getAllBookingsCustomer,
    giveRating,
    changingAvailability,
    getAllBookingsForAdmin,
    getAllRoutesForDriver,

} = require("../Controller/authFunctions");
const driver = require("../dataBase/driver");
const employeeAuth = require("../middleware/employeeAuth");

//create user
router.post("/user-reg", createCustomer);

//login user
router.post("/login-customer", async (req, res) => {
    await userLogin(req.body, ["Customer"], res);
  });

router.post("/login-driver", async (req, res) => {
    await userLogin(req.body, ["Driver"], res);
  });

router.post("/login-admin", async (req, res) => {
    await userLogin(req.body, ["Admin"], res);
  }); 
  
router.post("/login-operator", async (req, res) => {
    await userLogin(req.body, ["Operator"], res);
  });

/* protected route */
router.get("/protected", employeeAuth, async(req, res) => {
  if(req.user.role === "Driver"){
    const updatedUserInfo = await driver.findOne({id:req.user.id});
    return  res.json(updatedUserInfo);
  }else{
    return res.json(req.user);
  }
    
  })

//get all users by admin
router.get("/all-users", employeeAuth, findAllUsersForAdmin);

//create new route for driverId
router.post("/create-new-route-for-driver", employeeAuth, fromToRouteMoneyAdd);

//find all the drivers 
router.get("/all-drivers", employeeAuth, findAllDrivers);

//find the router detail fro the to and from data for customer
router.get("/route-detail/:from/:to", routeDetail);

//find all the from routes
router.get("/find-from-routes", getAllCreatedFrom );

//find all the to routes
router.get("/find-to-routes", getAllCreatedTo );

//create booking 
router.post("/create-new-booking", employeeAuth, createBooking);

//find all booking for driverId
router.get("/booking/:driverId", employeeAuth, getAllBookings);

//confirm the booking
router.patch("/confirm-booking/:bookingId", employeeAuth, confirmBooking);

//find all booking of customerId
router.get("/bookings-customer/:customerId", employeeAuth, getAllBookingsCustomer);

//update the rating number
router.patch("/update-driver-rating", employeeAuth, giveRating);

//change the availability of driver
router.patch("/changing-availability-driver", employeeAuth, changingAvailability);

//find all bookings for admin
router.get("/all-bookings-with-customer-driver-details", employeeAuth, getAllBookingsForAdmin);

//get all routes for driver
router.get("/all-routes-driver/:driverId", employeeAuth, getAllRoutesForDriver);

module.exports = router;
