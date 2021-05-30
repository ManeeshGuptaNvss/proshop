import express from 'express'
import path from 'path'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import colors from 'colors'
import userRouters from './routes/userRoutes.js'
import productRouters from './routes/productRoutes.js'
import orderRouters from './routes/orderRoutes.js'
import uploadRouters from './routes/uploadRoutes.js'
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
app.use('/api/upload', uploadRouters)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// Making a folder static so that it can be accessible and the files inside it get loaded in the browser
// ES module doesn't have dirname so we mimic that with path.resolve method
// Only node modules has the constant __dirname
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
