const express = require('express');
const {RegisterController , LoginController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

//routr objects
const router = express.Router();


//routes
//Login || Post
router.post('/login',LoginController);


//register || post
router.post('/register', RegisterController);

//Auth || Post
router.post('/getUserData' , authMiddleware , authController);

//Apply Doctor || Post
router.post('/apply-doctor' , authMiddleware , applyDoctorController);

// Notification Doctor || Get
router.get('/get-all-notification' , authMiddleware , getAllNotificationController);

//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);


//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);


module.exports = router;

