import { AppBar,Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import theme from '../theme';
import { UserAuth } from '../context/AuthContext';
import { useNavigate,useLocation } from 'react-router-dom';

const NavBar = () => {
  const router = useLocation();
  console.log(router.pathname)
  const {user,logoutUser} = UserAuth();
  const isActive = (pathname) => {
    return location.pathname === pathname;
  }
  return (
   (!isActive('/login') && !isActive('/')) &&  <AppBar color='default' sx={{
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        height: '57px',
        pt: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        px: 5,
        [theme.breakpoints.down('sm')]: {
          px: 1,
        },

        
    }}> <Box rowGap={'10px'} >
            <Button href="/postings" sx={{
                color: 'primary',
               
                fontWeight: 600,
                height: '2rem',
                fontSize: '1.8rem',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.2rem',
              },

                
            }}>WorkAble</Button>
            <Button href='/postings' sx={{marginLeft:'40px',
            height: '2rem', 
            borderRadius: 0,
            borderBottom: isActive('/postings')&& '3px solid #3AAE45',
            fontSize: '1.2rem',
            [theme.breakpoints.down('sm')]: {
              fontSize: '0.9rem',
            },
                }}>View Postings</Button>
            <Button href='/jobform' sx={{marginLeft:'40px',
            height: '2rem', 
            borderRadius: 0,
            borderBottom: isActive('/jobform')&& '3px solid #3AAE45',
            fontSize: '1.2rem',
            [theme.breakpoints.down('sm')]: {
              fontSize: '0.9rem',
            },
                }}>Add Posting</Button>
        </Box>
       <Box> 
       <Button variant='outlined' size='small' sx={{
              py: -1,
              height: '2rem',
              marginRight:'40px',
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.8rem',
                height: '1.5rem',
                marginRight:'40px'
              },
            }}>
              Edit Profile
            </Button>
          <Button onClick={()=>{logoutUser()}}variant='outlined' size='small' sx={{
              py: -1,
              height: '2rem',
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.8rem',
                height: '1.5rem',
              },
            }}>
              Log Out
            </Button>
         </Box>
    </AppBar>
  )
}

export default NavBar