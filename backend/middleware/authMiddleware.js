import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// Since it is a middleware, we don't add asynchandler and also next is used
const protect = asyncHandler(async (req, res, next) => {
  let token
//   console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        req.user=await User.findById(decoded.id).select('-password')
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorised, no token')
  }
  next()
})
export { protect }
