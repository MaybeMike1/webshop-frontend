export type ProductDto = {
  id: number
  _id: string
  name: string
  price: number
  quantity: number
  imgPath: string
}

export type Model = {
  _id: string
  modelName: string
}

export type Category = {
  _id: number
  category: string
}

export type Brand = {
  _id: string
  name: string
}
