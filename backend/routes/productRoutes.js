import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getProducts,
  getProductById,
  deleteProduct
} from '../controllers/productControllers.js'
// import asyncHandler from 'express-async-handler'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct)

export default router
