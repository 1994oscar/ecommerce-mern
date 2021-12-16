import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js' 

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword ? 
    {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {};
   
    const count = await Product.count({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    
    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch a single product by id
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
    res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Fetch all products
// @route   GET /api/products/admin
// @access  Private/Admin
export const getProductsAdmin = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword ? 
    {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {};
   
    const count = await Product.count({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    res.json({products, page, pages: Math.ceil(count / pageSize)})
});

// @desc    Create a product
// @route   POST /api/products/admin/
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: 'images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    }); 

    const createdProduct = await product.save(); 

    res.status(201).json(createdProduct); 
});

// @desc    Update Product
// @route   PUT /api/products/admin/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const { name,price,image,brand,category,countInStock,
            description} = req.body.data;

    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if(product){      
        product.name =  name;
        product.price =  price;
        product.user =   req.user._id;
        product.image =  image;
        product.brand =  brand;
        product.category =  category;
        product.countInStock =  countInStock;
        product.description = description;

        const updatedProduct = await product.save();

        res.json({message: "Product updated", updatedProduct});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete product
// @route   DELETE /api/products/admin/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        await product.remove();
        res.json({message: 'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createReviewProduct = asyncHandler(async (req, res) => {
    //console.log(req.body.data.rating)
    const { rating, comment} = req.body.data;

    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if(product){      
       const alreadyReviewed = product.reviews.find(r => 
                                r.user.toString() === req.user._id.toString());

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment, 
            user: req.user._id
        }

        product.reviews.push(review); 

        product.numReviews = Number(product.reviews.length);   
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
       
        await product.save();

        res.status(201).json({message: 'Review added'}); 
        
        const updatedProduct = await product.save();

        res.json({message: "Product updated", updatedProduct});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});