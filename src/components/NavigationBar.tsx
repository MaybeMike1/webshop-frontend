import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import SearchIcon from '@mui/icons-material/Search'

import React from 'react'
interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <div className="app-bar">
      <Box>
        <AppBar
          className="app-bar-comp"
          position="static"
          sx={{ flexGrow: 1.5, flexShrink: 1 }}
        >
          <Toolbar
            sx={{ flexGrow: 1.5, flexShrink: 1, width: '100%', height: '76px' }}
          >
            <IconButton size="large" color="inherit" aria-label="Show menu">
              <div className="burger-menu">
                <MenuOutlinedIcon fontSize="large" className="burger" />
              </div>
            </IconButton>
            <div className="right-menus">
              <div>
                <IconButton>
                  <ShoppingBagRoundedIcon
                    color="primary"
                    fontSize="large"
                    className="user-icon"
                  />
                </IconButton>
              </div>
              <div>
                <IconButton>
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
              endAdornment={<SearchIcon fontSize="large" sx={{mr: 0.5}} />}
              className="search-field"
              sx={{
                ml: 1,
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
        </AppBar>
      </Box>
    </div>
  )
}

export default NavigationBar
