export type CartItemType = { 
    id : string; 
    title : string;  
    price : number; 
    imageUrl : string; 
    sizes : number; 
    types : string; 
    count : number; 
  }

export  interface CartSliceState {
    totalPrice: number;
    items: CartItemType[]; 
  }