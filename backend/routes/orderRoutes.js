import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect,getMyOrders)
// always the '/:id' route at the end
//otherwise any other parameter defined above maybe treated as 'id'
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
export default router
