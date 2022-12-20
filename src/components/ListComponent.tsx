import React from 'react'
import { Container, Divider, IconButton, Typography } from '@mui/material'
import { ProductListInterface } from './../@interface/ProductListInterface'
import './../style/ProductListView.scss'
import { productService } from '../Services/productSerivce'
import categoryService from '../Services/categoryService'

export const ProductList: React.FC<ProductListInterface> = (
  props: ProductListInterface,
) => {
  const [cart, setCart] = React.useState([])

  async function addItemsToCart(product: any) {
    product.quantity = 1
    localStorage.setItem('cart', JSON.stringify(cart))
    await categoryService.getOne(product.category).then((data :any) => {
     product.category = data
    })


    
    setCart(cart => cart.concat(product))
  }
  return (
    <div className="productListWrapper">
      <div className="list">
        {props.products.map((product) => {
          product.imgPath =
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.affordablemac.co.uk%2Fwp-content%2Fuploads%2F2020%2F01%2FA1865256SILB.jpg&f=1&nofb=1&ipt=93e4bda04a6ddd9fea81b53ad7cc8577571f38e27064c87b257377b3314043e6&ipo=images'
          return (
            <div
              className="product-item"
              key={product.id}
              onClick={() => {
                addItemsToCart(product)
              }}
            >
              <div className="image">
                <img src={product.imgPath} alt={product.name} />
              </div>
              <div className="description">
                <div className="description__name">{product.name}</div>
                <div className="description__price">{product.price}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
