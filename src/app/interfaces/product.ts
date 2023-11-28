export interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
  id: number;
}

export interface NewProduct {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  quantity: number;
  imageUrl: string;
}
