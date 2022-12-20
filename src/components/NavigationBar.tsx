import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import SearchIcon from '@mui/icons-material/Search'

import React, { ReactNode, useEffect } from 'react'
import { Dropdown } from './UserDropdown'
import { Item } from '../@interface/Cart'
import { User } from '../@types/User'
import { Category } from '../@types/category'
import { GetCategories } from '../hooks/getCategories'
import { Link } from 'react-router-dom'
import { CartModal } from './CartModal'
interface NavigationBarProps {
  children: ReactNode
  user: User | null
  token: string | null
}
type Anchor = 'top' | 'left' | 'bottom' | 'right'

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const [search, setSearch] = React.useState('')
  const [cartItems, setCartItems] = React.useState<Item[]>([])
  const [drawer, setDrawer] = React.useState({ left: false })
  const [categories, setCategories] = React.useState<Category[]>([])
  const [dropown, setDropdown] = React.useState(false)
  const [isCartOpen, setIsCartOpen] = React.useState(false)

  const handleOpen = () => setIsCartOpen(true)
  const handleClose = () => setIsCartOpen(false)

  useEffect(() => {
    GetCategories().then((data: Category[]) => {
      setCategories(data)
    })
  }, [])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const renderCartModal = (list: any[]) => {
    return (
      <CartModal
        setOpen={setIsCartOpen}
        open={isCartOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
        cartItems={[]}
      />
    )
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>{text.category}</ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {props.user ? (
        <List>
          {[
            { name: 'My Profile', href: '/profile' },
            { name: 'Sign Out', href: '/profile' },
            { name: 'Home', href: '/' },
          ].map((element, index) => (
            <ListItem key={index} disablePadding>
              <Link to={element.href}>
                <ListItemButton>{element.name}</ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {['Login'].map((text, index) => (
            <Link key={text} to="/profile">
              Profile
            </Link>
          ))}
        </List>
      )}
    </Box>
  )

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setDrawer({ ...drawer, [anchor]: open })
  }

  const renderUserNavItems = () => {
    return <Dropdown options={['Login']} selected={''} isActive={dropown} />
  }

  return (
    <>
      <div className="app-bar">
        <Box>
          {dropown && renderUserNavItems()}
          {renderCartModal([])}
          <AppBar
            className="app-bar-comp"
            position="static"
            sx={{ flexGrow: 1.5, flexShrink: 1 }}
          >
            <Toolbar
              sx={{
                flexGrow: 1.5,
                flexShrink: 1,
                width: '100%',
                height: '76px',
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                aria-label="Show menu"
                onClick={toggleDrawer('left', true)}
              >
                <div className="burger-menu">
                  <MenuOutlinedIcon fontSize="large" className="burger" />
                </div>
              </IconButton>
              <div className="right-menus">
                <div>
                  <IconButton
                    onClick={() => {
                      setIsCartOpen(true)
                    }}
                  >
                    <ShoppingBagRoundedIcon
                      color="primary"
                      fontSize="large"
                      className="user-icon"
                    />
                  </IconButton>
                </div>
                <div
                  style={
                    dropown
                      ? { display: 'flex', flexDirection: 'column', zIndex: 10 }
                      : { display: 'flex' }
                  }
                >
                  <IconButton
                    onClick={() => {
                      setDropdown(!dropown)
                    }}
                  >
                    <PersonIcon
                      color="primary"
                      fontSize="medium"
                      className="user-icon"
                      sx={{
                        strokeWidth: 0.5,
                      }}
                    />
                  </IconButton>
                </div>
              </div>
            </Toolbar>
            <div className="search-container">
              <InputBase
                endAdornment={<SearchIcon fontSize="large" sx={{ mr: 0.5 }} />}
                className="search-field"
                sx={{
                  ml: 1,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,
                }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>
            <Drawer
              anchor="left"
              open={drawer['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </AppBar>
        </Box>
      </div>
      {props.children}
    </>
  )
}

export default NavigationBar
