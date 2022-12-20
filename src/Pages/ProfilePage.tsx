import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fade,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../@types/User'
import { useAuth } from '../Routes/AuthContext'
import { userServices } from '../Services/UserService'
import './../style/scss/profilePage.scss'
import orderService from '../Services/orderService'
import { productService } from '../Services/productSerivce'
import { userService } from '../Services/authService'

interface ProfilePageProps {
  user: User | null
}

export type UpdateUserDto = {
  firstName: string
  lastName: string
  email: string
  address: {
    streetName: string
    streetNumber: number
    zipCode: string
    city: string
    country: string
    region: string
  }
}
export type UserDetail = {
  isAdmin: any
  firstName: string
  lastName: string
  email: string
  userName: string
  __v: number
  _id: string
  address: {
    streetName?: string | undefined
    streetNumber?: number | undefined
    zipCode?: string | undefined
    city?: string | undefined
    country?: string | undefined
    region?: string | undefined
  }
}
export const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const [user, setUser] = React.useState<UserDetail | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [update, setUpdate] = React.useState<boolean>(false)
  const [orders, setOrders] = React.useState<any[]>([])
  const [products, setProducts] = React.useState<any[]>([])
  const { register, handleSubmit } = useForm()
  const [updatePassword, setUpdatePassword] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string | null>(null)

  const { logout } = useAuth()

  async function mapProducts(_ids: string[]) {
    const productsArr: any[] = []

    _ids.forEach((e: any) => {
      productsArr.push(productService.getOne(e))
    })

    Promise.all(productsArr).then((data) => {
      setProducts(data)
    })
  }

  useEffect(() => {
    orderService.getAllByUser().then((data) => {
      setOrders(data)
      data.map((order: any) => {
        mapProducts(order.products)
      })
    })
  }, [])

  const onSubmitInfo = async (data: any) => {
    setLoading(true)
    const updateUserDto: UpdateUserDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: {
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        zipCode: data.zipCode,
        city: data.city,
        country: data.country,
        region: data.region,
      },
    }
    await userServices
      .updateUser(props.user?._id, updateUserDto)
      .then((data) => {
        setUser(data)
        setLoading(false)
        setUpdate(false)
        setMessage(null)
      })
      setUpdatePassword(false)
  }

  const onSubmitPassword = async (data: any) => {
    setLoading(true)
    if (data.password !== data.repeatPassword) {
      setError('Passwords do not match')
      return
    }
    const passwordBundle = {
      oldPassword: data.oldPassword,
      password: data.password,
    }

    userServices.updateUserPassword(passwordBundle).then((data) => {
      setMessage(data)
      setLoading(false)
    })
  }

  function updateProfilePasswordTemplate() {
    return (
      <Card sx={{ mt: 1.5 }} className={'card'}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitPassword)}>
            <div className={'profile-information'}>
              <Typography
                sx={{ marginTop: 2.5, marginBottom: 2.5 }}
                variant="h5"
                component="h2"
              >
                Update Profile
              </Typography>
              <Typography variant="h6" component="h6">
                Profile
              </Typography>
              <FormControl
                sx={{
                  flex: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  width: '100%',
                }}
              >
                <Stack sx={{ mt: 1.5, mb: 1.5 }}>
                  {error ? <Alert severity="error">{error}</Alert> : null}
                  {message ? <Alert severity="success">{message}</Alert> : null}
                </Stack>
                <TextField
                  label={'Old Password'}
                  {...register('oldPassword', { required: true, minLength: 6 })}
                  type="password"
                />
                <TextField
                  label={'New Password'}
                  id={'firstName'}
                  type="password"
                  fullWidth
                  {...register('password', { required: true, minLength: 6 })}
                />
                <TextField
                  id={'firstName'}
                  type="password"
                  fullWidth
                  label={'Repeat New Password'}
                  {...register('repeatPassword', {
                    required: true,
                    minLength: 6,
                  })}
                />

                <Button type="submit">Update Password</Button>
              </FormControl>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
  function updateProfileDetailTemplate() {
    return (
      <Card className={'card'}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitInfo)}>
            <div className={'profile-information'}>
              <Typography
                sx={{ marginTop: 2.5, marginBottom: 2.5 }}
                variant="h5"
                component="h2"
              >
                Update Profile
              </Typography>
              <Typography variant="h6" component="h6">
                Profile
              </Typography>
              <FormControl
                sx={{
                  flex: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  width: '100%',
                }}
              >
                <TextField
                  label={'_id'}
                  defaultValue={user?._id}
                  disabled={true}
                ></TextField>
                <TextField
                  id="firstName"
                  type="text"
                  fullWidth
                  defaultValue={user?.userName}
                  disabled={true}
                  label={'Username'}
                />
                <TextField
                  id="firstName"
                  type="text"
                  fullWidth
                  defaultValue={user?.firstName}
                  label={'First Name'}
                  {...register('firstName')}
                />

                <TextField
                  id="firstName"
                  type="text"
                  fullWidth
                  defaultValue={user?.lastName}
                  label={'Last Name'}
                  {...register('lastName')}
                />
                <TextField
                  id="firstName"
                  type="text"
                  fullWidth
                  defaultValue={user?.email}
                  label={'Email'}
                />
                <Typography variant="h6" component="h6">
                  Address
                </Typography>
                <Container
                  sx={{
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 2.5,
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <TextField
                    id="firstName"
                    type="text"
                    label={'Street Name'}
                    sx={{ maxWidth: '45%' }}
                    defaultValue={user?.address.streetName}
                    {...register('streetName')}
                  />
                  <TextField
                    id="firstName"
                    type="text"
                    label={'Street Number'}
                    sx={{ maxWidth: '45%' }}
                    defaultValue={user?.address.streetNumber}
                    {...register('streetNumber')}
                  />
                  <TextField
                    id="firstName"
                    type="text"
                    label={'City'}
                    sx={{ maxWidth: '45%' }}
                    defaultValue={user?.address.city ?? 'Not Specified'}
                    {...register('city')}
                  />
                  <TextField
                    id="firstName"
                    type="text"
                    label={'Zip Code'}
                    sx={{ maxWidth: '45%' }}
                    defaultValue={user?.address.zipCode ?? 'Not Specified'}
                    {...register('zipCode')}
                  />
                  <TextField
                    id="firstName"
                    type="text"
                    label={'Country'}
                    sx={{ maxWidth: '45%' }}
                    defaultValue={user?.address.country}
                    {...register('country')}
                  />
                  <TextField
                    id="firstName"
                    type="text"
                    label={'State/Region'}
                    sx={{ maxWidth: '45%' }}
                    defaultValue={user?.address.region}
                    {...register('region')}
                  />
                </Container>

                <Button type="submit">Update Details</Button>
              </FormControl>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
  async function getUserDetailsFromDatabase() {
    const suser = await userServices
      .getUserById(props.user?._id)
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getUserDetailsFromDatabase()
  }, [])

  const renderProfileSection = () => {
    return (
      <Card sx={{pt: 10}} className="card">
        <CardContent className="card-content">
          <Typography variant="h5" component="h2">
            Contact Information
          </Typography>
          <div className={'profile-information'}>
            {loading ? (
              <CircularProgress />
            ) : (
              <div className={'profile-information'}>
                <Typography variant="body2" component="p">
                  <b>First Name:</b> {user?.firstName}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Last Name:</b> {user?.lastName}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Email:</b> {user?.email}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Username:</b> {user?.userName}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Role:</b> {user?.isAdmin ? 'Admin' : 'User'}
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
        <div className={'button-group'}>
          <Button
            variant="contained"
            onClick={() => {
              setUpdate(true)
            }}
          >
            Update Profile Details
          </Button>
          {user?.isAdmin ? (
            <Button variant="contained">Admin Panel</Button>
          ) : null}
          <Button
            onClick={() => {
              setUpdatePassword(true)
            }}
            variant="contained"
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              logout()
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    )
  }
  return (
    <Container sx={{ background: 'white' }} className={'main-content'}>
      {update ? updateProfileDetailTemplate() : renderProfileSection()}
      {updatePassword ? updateProfilePasswordTemplate() : null}
      <Card sx={{ mt: '10px' }}>
        <Typography variant="h5" component="h2">
          Previous Order
        </Typography>
        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((e) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {e._id}
                        </TableCell>
                        <TableCell align="center">
                          {e.timeStamp.replace('T', ' ').replace('Z', ' ')}
                        </TableCell>
                        <TableCell align="center">{e.total}</TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '10px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Something
          </Typography>
          <Typography variant="body2" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et
            malesuada fames ac turpis egestas. Mauris sit amet massa vitae
            tortor condimentum lacinia quis vel. Pellentesque adipiscing commodo
            elit at imperdiet. Adipiscing diam donec adipiscing tristique.
            Mattis aliquam faucibus purus in massa. Enim diam vulputate ut
            pharetra sit amet aliquam id. Purus viverra accumsan in nisl nisi
            scelerisque. Convallis convallis tellus id interdum velit. Eu
            feugiat pretium nibh ipsum consequat nisl vel pretium. Porta lorem
            mollis aliquam ut porttitor. Sit amet volutpat consequat mauris
            nunc. Adipiscing tristique risus nec feugiat in fermentum posuere
            urna nec. Egestas erat imperdiet sed euismod nisi. Massa sapien
            faucibus et molestie ac feugiat sed lectus vestibulum. Amet
            consectetur adipiscing elit ut aliquam purus sit amet. Volutpat
            consequat mauris nunc congue nisi vitae suscipit tellus. Dictum sit
            amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim
            ut tellus elementum sagittis. Tristique risus nec feugiat in
            fermentum. Quis hendrerit dolor magna eget. Pharetra et ultrices
            neque ornare aenean euismod elementum. Consectetur lorem donec massa
            sapien faucibus et molestie ac feugiat. Eget lorem dolor sed viverra
            ipsum nunc aliquet. A iaculis at erat pellentesque adipiscing
            commodo.
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '10px', padding: '10px 0 10px 0' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Your private data
          </Typography>
          <Typography variant="body2" component="p">
            We process something you can request for removal of your something
            something
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
