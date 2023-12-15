import './App.css';
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Box,
} from '@mui/material';
import { SearchOutlined, StarBorder } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <List>
          <ListItem disablePadding>
            <NavLink
              to='/search'
              style={{
                color: 'inherit',
                display: 'inline-block',
                width: '100%',
              }}
            >
              {({ isActive }) => (
                <ListItemButton selected={isActive}>
                  <ListItemIcon>
                    <SearchOutlined />
                  </ListItemIcon>
                  <ListItemText primary='Search' />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink
              to='/favorites'
              style={{
                color: 'inherit',
                display: 'inline-block',
                width: '100%',
              }}
            >
              {({ isActive }) => (
                <ListItemButton selected={isActive}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Favorites' />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
}

export default App;
