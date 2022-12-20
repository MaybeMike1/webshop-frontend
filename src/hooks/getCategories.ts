import { Category } from '../@types/category';
import categoryService  from './../Services/categoryService';

export async function GetCategories() {
    return categoryService.getAll().then((data : Category[]) => {
        return data
    });
}



