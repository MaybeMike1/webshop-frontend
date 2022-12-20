import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grow,
  IconButton,
  Slide,
  Typography,
} from '@mui/material'
import './../style/landingPage.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Slider } from '../components/SliderComponent'
import React, { useEffect } from 'react'
import GetMember from './../hooks/getUser'
import { ProductList } from '../components/ListComponent'
import { productService } from '../Services/productSerivce'
import { ProductDto } from '../@interface/ProductDto'

export const LandingPage: React.FC<{}> = () => {
  const [products, setProducts] = React.useState<ProductDto[]>([])
  
  
  async function getProductsFromDb() {
    productService.getAll().then((data) => {
      setProducts(data)
    })
  }


  useEffect(() => {
    getProductsFromDb()
  },[])
  return (
    <Container
      style={{ background: 'white' }}
      className="main-content"
      fixed
      maxWidth="sm"
      sx={{ marginTop: '40px' }}
    >
      <Typography variant="h5" fontWeight={'785'} textTransform={'uppercase'}>
        Popular Categories
      </Typography>
      <Divider />
      <div className="categories">
        <div className="category-item">
          <Typography className="category-name">
            Frontbetjente vaskemaskiner
          </Typography>
          <IconButton>
            <NavigateNextIcon className="next-button" />
          </IconButton>
        </div>
        <Divider />
        <div className="category-item">
          <Typography className="category-name">Støvsugere</Typography>
          <IconButton>
            <NavigateNextIcon className="next-button" />
          </IconButton>
        </div>
        <Divider />
        <div className="category-item">
          <Typography className="category-name">Bærbar PC</Typography>
          <IconButton>
            <NavigateNextIcon className="next-button" />
          </IconButton>
        </div>
        <Divider />
        <div className="category-item">
          <Typography className="category-name">Mobiltelefoner</Typography>
          <IconButton>
            <NavigateNextIcon className="next-button" />
          </IconButton>
        </div>
        <Divider />
        <div className="category-item">
          <Typography className="category-name">TV</Typography>
          <IconButton>
            <NavigateNextIcon className="next-button" />
          </IconButton>
        </div>
      </div>
      <Typography variant="h5" fontWeight={'785'} textTransform={'uppercase'}>
        Bestsellers - {new Date().getFullYear()}
      </Typography>
      <Slider
        images={[
          {
            imgPath:
              'https://p.turbosquid.com/ts-thumb/2J/MEd44X/1FCI98lE/dummy_1/jpg/1362252809/1920x1080/fit_q99/b1e967b3f9b9aa9c19b044dcbf9cc88c27cb1ea9/dummy_1.jpg',
            id: 1,
            label: 'First',
          },
          {
            imgPath:
              'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            id: 2,
            label: 'test',
          },
        ]}
      />

      <Typography
        sx={{ mb: 1 }}
        variant="h5"
        fontWeight={'785'}
        textTransform={'uppercase'}
      >
        Popular Search
      </Typography>
      <Divider />
      <div className="searches">
        <Grow in timeout={1000}>
          <div className="search-item">Prestige vinskabe</div>
        </Grow>
        <Grow in timeout={1250}>
          <div className="search-item">Prestige vinskabe</div>
        </Grow>
        <Grow in timeout={1500}>
          <div className="search-item">Prestige vinskabe</div>
        </Grow>
        <Grow in timeout={1000}>
          <div className="search-item">Prestige vinskabe</div>
        </Grow>

        <div className="search-item">Kaffemaskiner</div>
        <div className="search-item">MacBook</div>
        <div className="search-item">iPhone 13</div>
        <div className="search-item">Ugens bedste hvidevarer køb</div>
        <div className="search-item">Ledningsfrie støvsugere</div>
        <div className="search-item">Gaming</div>
        <div className="search-item">Samsung Galaxy</div>
        <div className="search-item">IPad</div>
      </div>
      <Typography variant="h5" fontWeight={'785'} textTransform={'uppercase'}>
        Most popular products
      </Typography>
      <Divider />
      <ProductList
        products={products}
      ></ProductList>
    </Container>
  )
}
