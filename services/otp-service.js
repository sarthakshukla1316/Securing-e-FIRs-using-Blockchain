const crypto = require('crypto');
const hashService = require('./hash-service');

const SMS_SID = process.env.SMS_SID;
const SMS_AUTH_TOKEN = process.env.SMS_AUTH_TOKEN;

const twilio = require('twilio')(SMS_SID, SMS_AUTH_TOKEN, {
    lazyLoading: true
});

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(100000, 999999);
        return otp;
    }

    async sendBySms(phone, code, otp) {
        try {
            return await twilio.messages.create({
                to: `${code}${phone}`,
                from: process.env.SMS_FROM_NUMBER,
                body: `Your Social Hub otp is ${otp}`,
            })
        } catch(err) {
            console.log(err.message);
        }
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);

        return computedHash === hashedOtp;
    }
}


module.exports = new OtpService();