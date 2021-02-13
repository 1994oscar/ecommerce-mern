import React from 'react'
import products from '../products'
import Product from '../components/Product'
import {Row, Col, Container} from 'react-bootstrap'

/** This is the Home page wdiget */

const HomeScreen = () => {

    return (
       <>
        <h1>Latest products</h1>

            <Row>
                {products.map( (product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                       <Product product={product} />
                    </Col>
                ))}
            </Row>
       </>
    )

}

export default HomeScreen