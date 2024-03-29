import React , {useEffect}          from 'react'
import Product                      from '../components/Product'
import {Row, Col}                   from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import {listProducts}               from '../actions/productAction'
import Message                      from '../components/Message'
import Loader                       from '../components/Loader'
import Paginate                     from '../components/Paginate'

const HomeScreen = ({match}) => {

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
   
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList 

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
       <>
        <h1>Latest products</h1>
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
        (
        <>
        <Row>
            {products.map( (product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product} />
                </Col>
            ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>)  
        }
       </>
    )

}

export default HomeScreen