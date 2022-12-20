import { ProductDto } from '../@interface/ProductDto'
import { httpService } from './httpService'

async function getAll() {
  const res = await httpService.get('/products/')
  return res.data.data as ProductDto[]
}

async function getOne(_id: string) {
  const res = await httpService.get('/products/' + _id)

  return res.data
}

async function deleteById(_id: string) {
  const res = await httpService.delete('/products/' + _id)

  return res.data
}

async function increment(_id: string) {
    const res = await httpService.put('/increment/' + _id);
    
    return res.data;
}

async function decrement(_id : string) {
    const res = await httpService.put('/decrement/' + _id);

    return res.data;
}

async function createProduct(product : any) {
  const res = await httpService.post('/create', product);

  return res.data;
}

async function getBrandById(_id: string) {
  const res = await httpService.get('/brands/' + _id)

  return res.data
}

export const productService = {
  getAll: getAll,
  deleteById: deleteById,
  decrementProduct : decrement,
  incrementProduct : increment,
  createProduct : createProduct,
  getOne : getOne,
  getBrandById :getBrandById
}
