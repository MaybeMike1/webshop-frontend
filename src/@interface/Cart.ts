export interface Cart {
    Items: Item[];
    

}


export interface Item{
    id: number;
    name: string;
    price: number;
}