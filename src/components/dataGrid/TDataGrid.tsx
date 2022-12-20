import { Button, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { ProductDto } from '../../@interface/ProductDto'
import { databaseUser } from '../../@types/databaseUser'
import { User } from '../../@types/User'
import { CreateProductModal } from '../CreateProductModal'
import { Transition } from '../Transition'

interface UserTableProps {
  title: string
  row: databaseUser[] | ProductDto[]
  col: GridColDef[]
  loading: boolean;
}

export const UsersTable: React.FC<UserTableProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  return (
    <Container>
      <Button onClick={handleClickOpen}>Add {props.title}</Button>
      {open ? <CreateProductModal isOpen={open} handleClose={handleClose} handleClickOpen={handleClickOpen} /> : null }
      <Typography variant="h4" component="h4" gutterBottom>
        {props.title} Table
      </Typography>
      <div style={{ height: 650 }}>
        <DataGrid
          sx={{ background: 'white' }}
          columns={props.col}
          rows={props.row}
          loading={props.loading}
        />
      </div>
    </Container>
  )
}
