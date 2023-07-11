export interface TIngredient {
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

export interface TConstructorIngredient extends TIngredient {
  uniqueID: string;
}

export interface ServerError {
  statusCode: number;
  description: string;
}
