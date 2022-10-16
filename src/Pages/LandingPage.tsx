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
import React from 'react'

export const LandingPage = () => {
  return (
    <Container
      style={{ background: 'white' }}
      className="main-content"
      fixed
      maxWidth="sm"
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
        <Grow
          in
          timeout={1000}
        >
          <div className="search-item">Prestige vinskabe</div>
        </Grow>
        <Grow
          in
          timeout={1250}
        >
          <div className="search-item">Prestige vinskabe</div>
        </Grow>
        <Grow
          in
          timeout={1500}
        >
          <div className="search-item">Prestige vinskabe</div>
        </Grow>
        <Grow
          in
          timeout={1000}
        >
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
      {/* <div className="card-container">
        <Slide direction="up" timeout={200} in mountOnEnter unmountOnExit>
          <Card
            className="card"
            sx={{ maxWidth: 345, width: 200, height: 200 }}
          >
            <CardHeader title="test"></CardHeader>
            <CardActionArea>
              <CardContent></CardContent>
            </CardActionArea>
          </Card>
        </Slide>
        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Card
            className="card"
            sx={{ maxWidth: 345, width: 200, height: 200 }}
          >
            <CardHeader title="test"></CardHeader>
            <CardActionArea>
              <CardContent></CardContent>
            </CardActionArea>
          </Card>
        </Slide>
        <Slide direction="up" in mountOnEnter unmountOnExit>
          <Card
            className="card"
            sx={{ maxWidth: 345, width: 200, height: 200 }}
          >
            <CardHeader title="test"></CardHeader>
            <CardActionArea>
              <CardContent></CardContent>
            </CardActionArea>
          </Card>
        </Slide>
      </div> */}
    </Container>
  )
}
