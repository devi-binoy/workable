import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Typography,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme';
import { UserAuth } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = UserAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        color="default"
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 5 },
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary',
              fontWeight: 600,
              fontSize: '1.8rem',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.2rem',
              },
            }}
          >
            WorkAble
          </Button>
          {user ? (
            <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
            <Button
              component={Link}
              to="/"
              variant="outlined"
              size="small"
              aria-label="home"
              sx={{
                py: -1,
                height: '2rem',
                mr: 1, // Adjust the margin here to add spacing between buttons
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.8rem',
                  height: '1.5rem',
                },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/myjobs"
              variant="outlined"
              size="small"
              aria-label="my-jobs"
              sx={{
                py: -1,
                height: '2rem',
                mr: 1, // Adjust the margin here to add spacing between buttons
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.8rem',
                  height: '1.5rem',
                },
              }}
            >
              My Jobs
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{
                py: -1,
                height: '2rem',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '0.8rem',
                  height: '1.45rem',
                },
              }}
            >
              Logout
            </Button>
          </Box>
          
          ) : (
            <Box display='flex' alignItems="center">
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                sx={{
                  py: -1,
                  height: '2rem',
                  [theme.breakpoints.down('sm')]: {
                    fontSize: '0.8rem',
                    height: '1.5rem',
                  },
                }}
              >
                Log in
              </Button>
            </Box>
          )}
          {user && (
            <Box display={{ md: 'none' }}>
              <Button
                onClick={toggleDrawer}
                aria-label="menu"
                sx={{
                  color: 'primary',
                }}
              >
                <Menu />
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {user && (
        <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 250,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '20px',
            background: '#f5f5f5',
            height: '100%',
          }}
        >
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={toggleDrawer}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Home
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/myjobs"
              onClick={toggleDrawer}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    My Jobs
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                borderRadius: '4px',
                '&:hover': {
                  background: '#f2f2f2',
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Logout
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      )}
    </>
  );
};

export default NavBar;
