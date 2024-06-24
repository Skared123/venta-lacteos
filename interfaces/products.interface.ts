import { Timestamp } from "firebase/firestore";

export interface Product {
  id?: string;
  productImage: ItemImage;
  price: number;
  productName: string;
  createdAt: Timestamp
}

export interface ItemImage {
  path: string;
  url: string;
}
