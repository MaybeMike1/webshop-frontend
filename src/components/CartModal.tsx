import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { productService } from '../Services/productSerivce'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  maxHeight: 450,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
}

export interface CartInterface {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleOpen: () => void
  handleClose: () => void
  cartItems: any[]
}

export const CartModal: React.FC<CartInterface> = (props) => {
    const getItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart') as string) || []
        return <>
            {cart.map((item: any) => {
                return <TableRow
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {item.name}
                    </TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">{item.price * item.quantity}</TableCell>
                    <TableCell align="center">{item.category.category}</TableCell>
                    <TableCell align="center">{item.model.model}</TableCell>
                    <TableCell align="center">
                        <Button onClick={() => {
                            localStorage.getItem('cart')
                        }}>Delete</Button>
                    </TableCell>

                </TableRow>
            })}
        </>
    }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{minWidth: '100%'}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Items in Basket
          </Typography>
          <TableContainer sx={{height: 300}} component={Paper}>
            <Table  sx={{ minWidth: 650 , overflow : 'auto'}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Model</TableCell>
                  <Table>Delete</Table>
                </TableRow>
              </TableHead>
              <TableBody>
                {getItems()}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={() => {props.handleClose()}} sx={{mt: 1}}>Go to checkout</Button>
        </Box>
      </Modal>
    </div>
  )
}
