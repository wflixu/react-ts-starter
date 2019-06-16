import { applyMiddleware, combineReducers, createStore, Store } from "redux";

import thunk from "redux-thunk";

import { productsReducer } from "./pages/product/ProductsReducer";
import { IProductsState } from "./pages/product/ProductsTypes";

import { basketReducer } from "./pages/product/BasketReducer";
import { IBasketState } from "./pages/product/BasketTypes";

export interface IApplicationState {
    basket: IBasketState;
    products: IProductsState;
}

const rootReducer = combineReducers<IApplicationState>({
    basket: basketReducer,
    products: productsReducer
});

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
} 