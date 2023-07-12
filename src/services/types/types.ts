export interface IngredientType {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface UserType {
  email: string;
  name: string;
}

export interface ConstructorIngredientType extends IngredientType {
  uniqueID: string;
}

export interface OwnerType {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderType {
  ingredients: string[];
  _id: string;
  owner: OwnerType;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: string;
  price?: number;
  __v?: number;
}

export interface CreateOrderResponseType {
  success: boolean;
  name: string;
  order: OrderType;
}

export interface GetOrderResponseType {
  orders: OrderType[];
}
