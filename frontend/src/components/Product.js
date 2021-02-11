import { Card } from "react-bootstrap"

/** {product} = Props, we can destructuring the props element with the {} keys, and modify
 * the name, with this, we can use only the product var, and not props.product._id, for example.
 */
const Product = ({product}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
            <Card.Text as='div'>
                <div className='my-3'>
                    {product.rating} from {product.reviews} reviews
                </div>
            </Card.Text>
            <Card.Text as='h3'>
                ${product.price}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product