import { Button, Container } from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { databaseUser } from '../@types/databaseUser'
import { User } from '../@types/User'
import { UsersTable } from '../components/dataGrid/TDataGrid'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { userService } from '../Services/authService'
import { userServices } from '../Services/UserService'
import { productService } from '../Services/productSerivce'
import { ProductDto } from '../@interface/ProductDto'

interface AdminPanelProps {
  user: User | null
}
export const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const [table, setTable] = React.useState('Users')
  const [users, setUsers] = React.useState<databaseUser[]>([])
  const [products, setProducts] = React.useState<ProductDto[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleDelete = (_id: string) => {
    userServices.deleteById(_id).then((data) => {
      setUsers(users.filter((user) => user._id !== _id))
    })
  }

  const handleDeleteProduct = (_id: string) => {
    productService.deleteById(_id).then((data) => {
      setProducts(products.filter((product) => product._id !== _id))
    })
  }

  const incrementProductQuantity = (_id: string) => {
    productService.incrementProduct(_id).then((data) => {
      const updatedList = products.map((el) => {
        if (el._id === _id) {
          el.quantity++
        }
      })
      setProducts((updatedList as unknown) as ProductDto[])
    })
  }
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    tableView: string,
  ) => {
    setTable(tableView)
  }
  const userCol: GridColDef[] = [
    { field: '_id', headerName: '_id', width: 250 },
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'userName', headerName: 'username', width: 150 },
    { field: 'isAdmin', headerName: 'role', width: 150 },
    {
      field: 'delete',
      headerName: 'delete',
      width: 90,
      renderCell: (params: GridCellParams) => (
        <Button
          disabled={params.row._id === props.user?._id}
          onClick={() => {
            handleDelete(params.row._id)
          }}
          variant={'contained'}
        >
          Delete
        </Button>
      ),
    },
  ]

  const productCol: GridColDef[] = [
    { field: '_id', headerName: '_id', width: 150 },
    { field: 'product', headerName: 'name', width: 150 },
    { field: 'price', headerName: 'price', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 150 },
    {
      field: 'delete',
      headerName: 'delete',
      width: 90,
      renderCell: (params: GridCellParams) => (
        <Button
          disabled={params.row._id === props.user?._id}
          onClick={() => {
            handleDeleteProduct(params.row._id)
          }}
          variant={'contained'}
        >
          Delete
        </Button>
      ),
    },
    {
      field: '+',
      headerName: '+',
      width: 90,
      renderCell: (params: GridCellParams) => (
        <Button
          disabled={params.row._id === props.user?._id}
          onClick={() => {
            incrementProductQuantity(params.row._id)
          }}
          variant={'contained'}
        >
          +
        </Button>
      ),
    },
  ]

  async function getUserRow() {
    setLoading(true)
    return await userServices.getAllUsers().then((res) => {
      res.forEach((user: databaseUser, index: number) => {
        user.id = index
      })
      setUsers(res)
      setLoading(false)
      return res
    })
  }

  useEffect(() => {
    getUserRow()
  }, [])

  async function getProducts() {
    setLoading(true)
    return await productService.getAll().then((res) => {
      res.forEach((element, index: number) => {
        element.id = index
      })
      setProducts(res)
      setLoading(false)
      return res
    })
  }

  useEffect(() => {
    getProducts()
  }, [])

  function renderSelectedTemplate(cat: string) {
    if (!props.user) return <div>Unauthorized</div>
    switch (cat) {
      case 'Users':
        return (
          <UsersTable
            loading={loading}
            title={`${cat}`}
            col={userCol}
            row={users}
          />
        )
      case 'Products':
        return (
          <UsersTable
            title={`${cat}`}
            col={productCol}
            row={products}
            loading={false}
          />
        )
    }
  }
  const columns: GridColDef[] = []
  return (
    <Container
      sx={{ height: 700, width: '100vw', background: 'white' }}
      className="main-content"
    >
      {
        <>
          <ToggleButtonGroup>
            <ToggleButton
              value={'Users'}
              onClick={() => {
                setTable('Users')
              }}
            >
              Users
            </ToggleButton>
            <ToggleButton
              value={'Products'}
              onClick={() => {
                setTable('Products')
              }}
            >
              Products
            </ToggleButton>
          </ToggleButtonGroup>
          {renderSelectedTemplate(table)}
        </>
      }
    </Container>
  )
}
