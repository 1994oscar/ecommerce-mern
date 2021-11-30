import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col}     from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import Message  from '../../components/Message'
import Loader   from '../../components/Loader'
import {listProductDetails} from '../../actions/productAction'

import FormContainer from '../../components/FormContainer'
import {updateProductAdmin} from '../../actions/productAction'


const ProductEditScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const productId = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);


    const getProductState = useSelector(state => state.productDetails);
    const {loading, error, product} = getProductState;

    const updateProductState = useSelector(state => state.productUpdateAdmin);
    const {loading:updateLoading, success:updateSuccess, error:updateError, product:updatedProduct, message:updateMessage} = updateProductState; 

    useEffect(()=>{
        if(!product.name || product._id !== productId){
            dispatch(listProductDetails(productId));
        }else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }

        if(updateSuccess){
            dispatch(listProductDetails(productId));
        }

    }, [dispatch, product, productId, updateSuccess]);


    const uploadHandler = async (e) => {
       const file = e.target.files[0];
       const formData = new FormData();
       formData.append('image', file);
       setUploading(true);

       try {
        axios.defaults.headers.common['Content-Type']  = 'multipart/form-data';
       
        const {data} = await axios.post('/api/upload', formData);
        setImage(data);
        setUploading(false);
       } catch (error) {
           console.error(error)
           setUploading(false); 
       }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const product = {_id: productId, name,price,image,brand,category,countInStock,description};
        dispatch(updateProductAdmin(product));
    } 

    return (
        <>
        {updateLoading && <Loader/>}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {updateSuccess && <Message variant='success'>{updateMessage}</Message>}
        <Link to='/admin/products-list' className='btn btn-light my-3'>Go Back</Link>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:  (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>Product brand</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter product brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Product category</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter product category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Product description</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter product description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Product price</Form.Label>
                    <Form.Control 
                        type='number'
                        placeholder='Enter product price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='stock'>
                    <Form.Label>Product stock</Form.Label>
                    <Form.Control 
                        type='number'
                        placeholder='Enter product stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Product image</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}>
                    </Form.Control>
                    <Form.File 
                        id='image-file' 
                        label='Choose File'
                        custom
                        onChange={uploadHandler}>
                        </Form.File>
                        {uploading && <Loader />}
                </Form.Group>

                <Button type='submit' variant='primary'>Save</Button>
            </Form>
            </FormContainer>
            )}
   </> )
}

export default ProductEditScreen
