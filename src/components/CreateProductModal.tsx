import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Category } from '../@interface/ProductDto'
import categoryService from '../Services/categoryService'
import { productService } from '../Services/productSerivce'

interface ProductModalProps {
  isOpen: boolean
  handleClose: () => void
  handleClickOpen: () => void
}
export const CreateProductModal: React.FC<ProductModalProps> = (props) => {
  const { register } = useForm()
  const [category, setCategories] = useState<Category[]>([])

  useEffect(() => {
    categoryService.getAll().then((data) => {
      data.forEach((el : any) => {
        delete el.__v
      })
      setCategories(data);
    })
  }, [])

  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle>Create</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Product Name"
          type="email"
          fullWidth
          variant="standard"
          {...register('productName')}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          {...register('price')}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          {...register('quantity')}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={category}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}
