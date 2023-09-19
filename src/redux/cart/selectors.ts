import { RootState } from '../store';
import { CartItemType } from './types';

export const selectCart = (state: RootState) => state.cartSlice;

export const selectCartItemById = (id: string) => (state: RootState) => state.cartSlice.items.find((obj) => obj.id === id); 

export const selectCartItemByTitle = (title: string) => (state: RootState) => state.cartSlice.items.find((obj) => obj.title === title); 



  export const selectCartItemByIdSizesTypes = (title: string, sizes: number, types: string) => (state: RootState) => state.cartSlice.items.find(
    (obj) => obj.title === title && obj.sizes === sizes && obj.types === types
  ) 

  export const selectCartItemByTitleSizesTypes = (title: string, sizes: number, types: string) => (state: RootState) => state.cartSlice.items.find(
    (obj) => obj.title === title && obj.sizes === sizes && obj.types === types
  ) 

  export const selectIIT = (
    id : string, 
  title : string,  
  price : number, 
  imageUrl : string, 
  sizes : number, 
  types : string, 
  ) => (state: RootState) => state.cartSlice.items.find((obj) => 
  obj.id === id && 
  obj.title === title &&  
  obj.price  === price &&
  obj.imageUrl === imageUrl &&  
  obj.sizes === sizes &&  
  obj.types === types 
  )

  
  export const selec = (item: CartItemType) => (state: RootState) => state.cartSlice.items.find((obj) => obj === item )