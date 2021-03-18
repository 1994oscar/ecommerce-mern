import React , {useState, useEffect} from 'react'
import products from '../products'
import Product from '../components/Product'
import {Row, Col, Container} from 'react-bootstrap'
import axios from 'axios'

/** This is the Home page widget */

const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    /* 
        useEffect is execute as soon is the component load.
        With useEffecte we can use Axios to make request to the server. 
    */

    useEffect(() => {

        const fecthProducts = async () => {
            const {data} = await axios.get('/api/products');
            
            setProducts(data);
        }

        fecthProducts();
    }, []);

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