import express from 'express'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import colors from 'colors'
import userRouters from './routes/userRoutes.js'
import productRouters from './routes/productRoutes.js'
import orderRouters from './routes/orderRoutes.js'
dotenv.config()

import connectDB from './config/db.js'
connectDB()
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRouters)
app.use('/api/users', userRouters)
app.use('/api/orders', orderRouters)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
