export enum SortPropertyEnum {
    RATING = "rating",
    PRICE = "price",
    TITLE = "title",
  }
   
  
  export type SortPopup = {
    name: string,
    sortProperty: SortPropertyEnum,
  }
  
  export interface FilterScliceState  {
    searchValue: string,
    categoryId: number,
    pageCount: number,
    currentPage: number,
    filters: string,
    sortType: SortPopup,
    order: string
  
  }