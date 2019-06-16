import { BasketActionTypes, IBasketAdd } from "./BasketTypes";
import { IProduct } from "./../../data/ProductsData";
export const addToBasket = (product: IProduct): IBasketAdd => ({
  product,
  type: BasketActionTypes.ADD
});
