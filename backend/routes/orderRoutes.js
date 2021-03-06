import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,getOrders, updateOrderToDelivered
} from '../controllers/orderController.js'
import { protect,admin } from '../middleware/authMiddleware.js'
const router = express.Router()
router.route('/').post(protect, addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
// always the '/:id' route at the end
//otherwise any other parameter defined above maybe treated as 'id'
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
export default router
