export type Pizza = { 
    category: string; 
    id: string;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number | number[];
    title: string;
    types: number | number[];
  }
  
  export type SearchPizzaParams = {
    sortBy: string, 
    order: string, 
    category: string, 
    currentPage: string, 
    search: string
  }

  export enum Status {
    LOADING = 'loading',
    SUCCSESS = 'success',
    ERROR = 'error'
  }
  
  export interface PizzaSliceState {
    items: Pizza[];
    status: Status
  }