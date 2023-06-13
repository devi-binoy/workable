import {useEffect, useState, React} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import theme from '../theme';
import { fetchApplicants } from '../services/Applicants';

const CustomTable = ({data}) => {
  const [applicants, setApplicants] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      fetchApplicants('Cmmm4zvXxrFt74x1CtdQ').then((res) => {
          setApplicants(res);
      });
  }, []);
  useEffect(() => {
      if (applicants) {
          setLoading(false);
      }
  }, [applicants]);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{backgroundColor:theme.palette.primary.darker}}>
          <TableRow >
            <TableCell sx={{ color: "#ffffff" }}>CANDIDATE NAME</TableCell>
            <TableCell sx={{ color: "#ffffff" }}>APPLICATION STATUS</TableCell>
            <TableCell sx={{ color: "#ffffff" }}>APPLIED ROLE</TableCell>
            <TableCell sx={{ color: "#ffffff" }}>APPLICATION DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants && Array.isArray(applicants) && applicants.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.appliedDate.toDate().toDateString()}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.contactNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
