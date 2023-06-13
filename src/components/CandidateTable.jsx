import {useEffect, useState, React} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography,Tab,Box } from '@mui/material';
import { TabContext } from '@mui/lab';
import theme from '../theme';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomTable from './CustomTable';

const CandidateTable = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <Grid container flexDirection={'column'} 
    sx={{ 
            m: '3em',
            p: '2rem',
            [theme.breakpoints.down('md')]: {
                m: '1em',
                p: '1rem',
            },
     
    }}>
        <Typography variant="heading1" color={theme.palette.primary.darker}sx={{ fontWeight: 'bold'}}>Candidates</Typography>
        <Grid container flexDirection={'column'} 
        sx={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)',
            borderRadius: '9px',
            p: '2rem',
            mt: '2rem',
        }}
       >
        <TabContext value={value} flexDirection={'column'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="All" value="1" />
                <Tab label="Accepted" value="2" />
                <Tab label="Rejected" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><CustomTable /></TabPanel>
            <TabPanel value="2"><CustomTable status={"Accepted"}/></TabPanel>
            <TabPanel value="3"><CustomTable status={"Rejected"}/></TabPanel>
        </TabContext>
       </Grid>
    </Grid>
  )
}

export default CandidateTable
