import { Box, Button, Divider, Drawer, List, ListItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../@types/category'
import { User } from '../@types/User'
import categoryService from './../Services/categoryService'

interface DrawerProps {
  open: boolean;
  anchor: string;
  user : User | null;
}

export const DrawerComponent: React.FC<DrawerProps> = (props) => {
  type Anchor = 'top' | 'left' | 'bottom' | 'right'

  const [categories, setCategories] = React.useState<Category[]>([])

  async function getCategories() {
    categoryService.getAll().then((data) => {
      setCategories(data)
    })
  }


  function profileItems (user : User | null) {
    if (user) {
      return (
        <>
          <ListItem>
            <Link to="/profile">Profile</Link>
          </ListItem>
          <ListItem>
            <Link to="/logout">Logout</Link>
          </ListItem>
        </>
      )
    } else {
      return (
        <>
          <ListItem>
            <Link to="/login">Login</Link>
          </ListItem>
          <ListItem>
            <Link to="/register">Register</Link>
          </ListItem>
        </>
      )
    }
  }

  React.useEffect(() => {
    getCategories()
  }, [])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

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

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor: Anchor) => (
    <Box>
      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>{category.category}</ListItem>
        ))}
      </List>
    </Box>
  )


  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            <Divider />
            {profileItems(props.user)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
