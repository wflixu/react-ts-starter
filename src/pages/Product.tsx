import React from 'react';

import Tabs from '../components/Tabs';
import { IProduct } from '../data/ProductsData';

interface IProps {
    product: IProduct;
    inBasket: boolean;
    onAddToBasket: () => void;
}
const Product: React.SFC<IProps> = props => {
    const { product } = props;
    const handleAddClick = () => {
        props.onAddToBasket();
    }
    return <React.Fragment>
        <h1>{product.name}</h1>
        <Tabs>
            <Tabs.Tab name="Description" initialActive={true}
                heading={() => <b>Description</b>}  >
                <p>{product.description}</p>
            </Tabs.Tab>
            <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
                <ul className="product-reviews">
                    {product.reviews.map(review => (<li key={review.reviewer}>
                        <i>"{review.comment}"</i> - {review.reviewer}
                    </li>))}
                </ul>
            </Tabs.Tab>

        </Tabs>

        <p>{product.description}</p>

        <p className="product-price">
            {new Intl.NumberFormat("en-US", {
                currency: "USD", style: "currency"
            }).format(product.price)}
        </p>
        {!props.inBasket && (
            <button onClick={handleAddClick}>Add to basket</button>)}
    </React.Fragment>
}

export default Product;

