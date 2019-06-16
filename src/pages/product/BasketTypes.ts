import { IProduct } from "./../../data/ProductsData";

export enum BasketActionTypes {
  ADD = "BASKET/ADD"
}
export interface IBasketState {
  readonly products: IProduct[];
}
export interface IBasketAdd {
  type: BasketActionTypes.ADD;
  product: IProduct;
}
export type BasketActions = IBasketAdd;
