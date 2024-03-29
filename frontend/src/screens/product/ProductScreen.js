import React, {useState, useEffect}            from 'react'
import {Link}           from 'react-router-dom'
import Rating            from '../../components/Rating'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails, createProductReview} from '../../actions/productAction'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productsConstants'

const ProductScreen = ({history, match}) => {
    const productId = match.params.id;
    const [qty, setQty]         = useState(1);  
    const [rating, setRating]   = useState(0);  
    const [comment, setComment] = useState("");  

    const dispatch = useDispatch(); 
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin; 

    const productDetails = useSelector(state => state.productDetails); 
    const {loading, error, product} = productDetails;  

    const productReviewCreate = useSelector(state => state.productCreateReview);
    const {loading:reviewLoading, success:reviewSuccess, error:reviewError, message:reviewMessage} = productReviewCreate;

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
        dispatch(listProductDetails(productId));   
    }, [dispatch, match, reviewSuccess]); 

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`); 
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const newReview = {rating, comment};
       dispatch(createProductReview(productId, newReview));
    }
    return (
       <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>) : (
            <>
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

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => 
                                        setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col> 
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block' type='button' 
                                    disabled={product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No reviews</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        {reviewLoading && <Loader />} 
                        {reviewError && <Message variant='danger'>{reviewError}</Message>}
                        {reviewSuccess && <Message variant='success'>{reviewMessage}</Message>}
                        <h2>Write a Customer Review</h2> 
                        {userInfo && !product.reviews.find(r => r.user === userInfo._id) ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control 
                                    as='select' 
                                    value={rating} 
                                    onChange={(e)=>setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' 
                                    row={3} value={comment} 
                                    onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary'>Send comment</Button>
                            </Form>
                        ) : !product.reviews.find(r => r.user === userInfo._id) ? 
                            <Message>Please <Link to='/login'>sign in</Link>to write a review</Message> 
                            : <Message>You already have a review of this product</Message> }
                    </ListGroup.Item>
                </ListGroup>                                
            </Col>
        </Row>
        </>
        )} 
       </>
    )

}

export default ProductScreen