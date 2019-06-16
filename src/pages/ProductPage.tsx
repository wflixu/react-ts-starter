import * as React from 'react';
import { connect } from "react-redux";
import { addToBasket } from "./product/BasketActions";
import { getProduct } from "./product/ProductsActions";
import { IApplicationState } from "./../Store";
import { RouteComponentProps, Route } from 'react-router-dom';

import PromptFix from './../components/PromptFix'


import { IProduct } from '../data/ProductsData';
import Product from './Product';
type Props = RouteComponentProps<{ id: string }>;


interface IProps extends RouteComponentProps<{ id: string }> {
    addToBasket: typeof addToBasket;
    getProduct: typeof getProduct;
    loading: boolean;
    product?: IProduct;
    added: boolean;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToBasket: (product: IProduct) => dispatch(addToBasket(product)),
        getProduct: (id: number) => dispatch(getProduct(id))
    };
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        added: store.basket.products.some(p =>
            store.products.currentProduct ? p.id ===
                store.products.currentProduct.id : false),
        basketProducts: store.basket.products,
        loading: store.products.productsLoading,
        product: store.products.currentProduct || undefined
    };
};

class ProductPage extends React.Component<IProps>{
    public componentDidMount() {
        if (this.props.match.params.id) {
            const id: number = parseInt(this.props.match.params.id, 10);
            this.props.getProduct(id);
        }
    }

    public render() {
        const product = this.props.product;
        return (<div className="page-container">
            <PromptFix when={!this.props.added} message={this.navAwayMessage} />
            {product || this.props.loading ? (<Product loading={this.props.loading} product={product}
                inBasket={this.props.added}
                onAddToBasket={this.handleAddClick}
            />) : (<p>Product not found!</p>)}
        </div>)
    }
    private handleAddClick = () => {
        if (this.props.product) {
            this.props.addToBasket(this.props.product);
        }
    }
    private navAwayMessage = () => {
        return "are you sure you leave without buying this product？";
    }
}

export default connect(  mapStateToProps,  mapDispatchToProps )(ProductPage);

