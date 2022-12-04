const UserDto = require("../dtos/user-dto");
const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const bcrypt = require('bcrypt');

class AuthController {

    async sendOtp(req, res) {
        console.log(req.body, 'body');
        const { name, aadharNumber, pin } = req.body;
        if( !name || !aadharNumber || !pin ) {
            return res.status(400).json({ message: 'All fields are required !'});
        }

        let user = await userService.findUser({ aadharNumber });
        if(user) {
            return res.status(400).json({ message: 'User already exist!'});
        }
        // // Generate Otp
        const otp = await otpService.generateOtp();

        // // Hash Otp
        const ttl = 1000 * 60 * 2;                  // 2 minutes
        const expires = Date.now() + ttl;           // Expiry time

        const data = `${aadharNumber}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        console.log(hash, 'hash');

        // // Send otp
        try {
            // await otpService.sendBySms('9140099548', '+91', otp);
            await userService.createUser({ name, aadharNumber, pin });
            res.status(200).json({
                hash: `${hash}.${expires}`,
                aadharNumber,
                otp
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: 'Otp Sending failed'});
        }

    }

    async verifyOtp(req, res) {
        const { aadharNumber, otp, hash } = req.body;

        if(!aadharNumber || !otp || !hash) {
            return res.status(400).json({ message: "All fields are required"});
        }

        const [ hashedOtp, expires ] = hash.split('.');

            if(Date.now() > +expires) {
                return res.status(400).json({ message: 'Otp expired !'});
            }
    
            const data = `${aadharNumber}.${otp}.${expires}`;
    
            const isValid = otpService.verifyOtp(hashedOtp, data);
    
            if(!isValid) {
                return res.status(400).json({ message: 'Invalid Otp' });
            }
    
            let user;
    
            try {
                user = await userService.findUser({ aadharNumber });
                if(!user) {
                    // user = await userService.createUser({ email });
                    return res.status(400).json({ message: 'User does not exist...'});
                }
            } catch(err) {
                console.log(err);
                return res.status(500).json({ message: 'Something went wrong...'});
            }
    
            const { accessToken, refreshToken } = tokenService.generateTokens({ 
                _id: user._id,
                verified: true,
            });

            console.log(accessToken, 'access');

            user.verified = true;
            await user.save();
    
            await tokenService.storeRefreshToken(refreshToken, user._id);
    
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            });
    
            const userDto = new UserDto(user);
            res.status(200).json({ user: userDto, auth: true });

    }


    async login(req, res) {
        const { aadharNumber } = req.body;
        console.log(aadharNumber, 'aadhar');
        if( !aadharNumber ) {
            return res.status(400).json({ message: 'All fields are required !'});
        }

        let user = await userService.findUser({ aadharNumber });
        if(!user) {
            return res.status(400).json({ message: 'User does not exist!'});
        }

        // // Generate Otp
        const otp = await otpService.generateOtp();

        // // Hash Otp
        const ttl = 1000 * 60 * 2;                  // 2 minutes
        const expires = Date.now() + ttl;           // Expiry time

        const data = `${aadharNumber}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        console.log(user, 'iser');

        // Send otp
        try {
            // await otpService.sendBySms('9140099548', '+91', otp);
            res.status(200).json({
                hash: `${hash}.${expires}`,
                aadharNumber,
                otp
            })
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: 'Otp Sending failed'});
        }

    }


    async refresh(req, res) {
        const { refreshToken: refreshTokenFromCookie } = req.cookies;

        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        } catch(err) {
            return res.status(401).json({ message: 'Invalid token'});
        }
    
        try {
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            if(!token) {
                return res.status(401).json({ message: 'Invalid token'});
            }
        } catch(err) {
            return res.status(500).json({ message: 'Invalid token'});
        }

        const user = await userService.findUser({ _id: userData._id });
        if(!user) {
            return res.status(404).json({ message: 'No user'});
        }


        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: userData._id });

        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch(err) {
            return res.status(404).json({ message: 'Internal Server error'});
        }

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
        
    }

    async logout(req, res) {
        // // delete refresh token from db

        // const { refreshToken } = req.cookies;
        // await tokenService.removeToken(refreshToken);

        // // delete cookie from res
        // res.clearCookie('refreshToken');
        // res.clearCookie('accessToken');

        // res.json({ user: null, auth: false });
    }
}


module.exports = new AuthController();