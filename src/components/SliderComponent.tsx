import {
  Box,
  Button,
  makeStyles,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import { SliderInterface } from '../@interface/SliderInterface'

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import './../style/slider.scss'
import Carousel from 'react-material-ui-carousel'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

export const Slider: React.FC<SliderInterface> = (props: SliderInterface) => {
  /* const AutoPlaySwipeableViews = autoPlay(SwipeableViews) */
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = props.images.length
  const [standalone, setStandalone] = React.useState(false)
  const location = useLocation()
  const handleProductClick = (product: any) => {
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Carousel
    >
      {props.images.map((image, index) => (
        <div className="item-container" key={index}>
          <Typography
            variant="h5"
            fontWeight={'100'}
            textTransform={'uppercase'}
          >
            {image.label}
          </Typography>
          <img loading="lazy" className="slider-image" src={image.imgPath} alt={image.label} />
          <Link className="link" to={`/products/${image.id}`}>
            <Button
              onClick={() => {
                handleProductClick(image)
              }}
            >
              Check {image.label} out
            </Button>
          </Link>
        </div>
      ))}
    </Carousel>
  )
}
