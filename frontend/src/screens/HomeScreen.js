import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import Meta from '../components/Meta.js'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel.js'
// import axios from 'axios'
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <Meta/>
      {!keyword ?<ProductCarousel />:<Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
