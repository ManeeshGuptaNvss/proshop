import express from 'express'
import {
  getProducts,
  getProductById,
} from '../controllers/productControllers.js'
// import asyncHandler from 'express-async-handler'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

export default router
