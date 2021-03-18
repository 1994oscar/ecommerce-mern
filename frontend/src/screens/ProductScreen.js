import React, {useState , useEffect}            from 'react'
import {Link}           from 'react-router-dom'
import products         from '../products'
import Product          from '../components/Product'
import Rating            from '../components/Rating'
import {Row, Col, Container, Image, ListGroup, Card, Button} from 'react-bootstrap'
import axios from 'axios'

/** This is the Product Screen Page. 
 * 
 * The {match} arguments can acces to the parameter that contain the URI, in the App.js files, 
 * we pass to the /product link, the id of the product liket this /product/:id, with {match}, we can
 * access to the id value. 
 */

const ProductScreen = ({match}) => {

    //const product = products.find(p => p._id === match.params.id);

    const [product, setProduct] = useState({});

    useEffect(() => {
        const fecthProduct = async () => {
            const {data} = await axios.get(`/api/products/${match.params.id}`);

            setProduct(data);
        }

        fecthProduct();
    }, [])

    return (
       <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
            <Col md={4}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={5}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Rating 
                        value={product.rating}
                        text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: {product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price: 
                                </Col>
                                <Col>
                                    <strong>{product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status: 
                                </Col>
                                <Col>
                                   {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock' }
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='btn-block' type='button' 
                                    disabled={product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
       </>
    )

}

export default ProductScreen