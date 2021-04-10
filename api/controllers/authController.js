const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body

        // check whether email and password is given
        if(!email || !password){
            return next(new AppError(404, 'fail', 'Please provide email or password'),
            req,
            res,
            next)
        }

        // check whether user exists
        const user = await User.findOne({ email: email }).select('+password')
        if(!user || !(await user.correctPassword(password, user.password))){
            return next(
                new AppError(401, 'fail', 'Email or Password is wrong'),
                req,
                res,
                next
            )
        }

        // send jwt
        const token = createToken(user.id)
        user.password = undefined
        res.status(200).json({
            status: 'success',
            token,
            data:{
                user
            }
        })
    }
    catch(err){
        next(err)
    }
}

exports.signup = async (req, res, next) => {
    try{
        const user = await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            role: req.body.role
        })

        const token = createToken(user.id)
        user.password = undefined
        res.status(200).json({
            status: 'success',
            token,
            data:{
                user
            }
        })
    }
    catch(err){
        next(err)
    }
}

const createToken = id => {
    return jwt.sign({ id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}