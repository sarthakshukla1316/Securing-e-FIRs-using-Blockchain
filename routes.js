const router = require('express').Router();

const authController = require('./controllers/auth-controller');
const { authMiddleware } = require('./middlewares/auth-middlewares');


// Authentication
router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/login', authController.login);

// Refresh token
router.get('/api/refresh', authController.refresh);

// logout user
// router.post('/api/logout', authMiddleware, authController.logout);

module.exports = router;