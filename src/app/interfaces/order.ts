import { CartItem } from "./cartItem";

export interface Order {
    id: number;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    orderDate: Date;
}
