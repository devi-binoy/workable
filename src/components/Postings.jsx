import React, { useState, useEffect } from 'react';
import { Grid,CircularProgress,Button,InputAdornment, TextField, IconButton, Typography } from '@mui/material';
import Card from './Card';
import { fetchInitialPage, fetchNextPage, searchDocuments, searchNextDocuments } from '../services/JobPostings'
import { UserAuth } from "../context/AuthContext";
import {Search as SearchIcon} from '@mui/icons-material';


const Postings = () => {
  const [results, setResults] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { user } = UserAuth();

  const fetchInitialData = async () => {
    setLoading(true);
    if (user) {
      const { initialResults, lastDocument } = await fetchInitialPage(user.uid);
      setResults(initialResults);
      setLastDocument(lastDocument);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    const { matchingDocuments, lastDocument } = await searchDocuments(user.uid, search);
    setResults(matchingDocuments);
    setLastDocument(lastDocument);
    setIsSearching(true);
  };

  useEffect(() => {
    fetchInitialData();
  }, [user]);

  useEffect(() => {
    if (results) {
      setLoading(false);
    }
  }, [results, lastDocument]);

  const loadNextPage = async () => {
    setLoading(true);
    if (isSearching) {
      const { matchingDocuments, newLastDocument } = await searchNextDocuments(user.uid, search, lastDocument);
      setResults((prevResults) => [...prevResults, ...matchingDocuments]);
      setLastDocument(newLastDocument);
    } else {
      const { nextPageResults, newLastDocument } = await fetchNextPage(user.uid, lastDocument);
      setResults((prevResults) => [...prevResults, ...nextPageResults]);
      setLastDocument(newLastDocument);
    }
  };

  const removeDeletedItem = (itemId) => {
    setResults(prevResults => prevResults.filter(result => result.id !== itemId));
  };


  return (
    <>
    <Grid container flexDirection='column'mt={9} alignItems="center" justifyContent="center">
      <Typography variant="heading1" fontWeight={'bold'} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        My Job Postings
      </Typography>
      <Grid item alignItems="center" justifyContent="center" m={2} xs={12} sm={6}>
        <TextField
            variant="outlined"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: '50px',
              width: {xs:'100%' ,sm:'370px', md:'500px'} },
            }}
          />
      </Grid>
      <Grid container alignItems="center" justifyContent="center" marginBottom={2} >
      {results.length>0 ? results.map((result, index) => (
        <Card
          key={index}
          id={result.id}
          JobTitle={result.JobTitle}
          JobLocation={result.JobLocation}
          posted_date={result.posted_date.toDate().toDateString()}
          experience={result.experience}
          numberofapplicants={result.numberofapplicants}
          ApplicationDeadline={result.ApplicationDeadline.toDate().toDateString()}
          workmode={result.workmode}
          removeDeletedItem={removeDeletedItem}
        />
      )):<Typography fontSize={22} color={'gray'} mt={10}>No Postings Added, Click on Add Posting!</Typography>}
      {loading ? (
        <Grid container alignItems={'center'} justifyContent={'center'} m={5}>
          <CircularProgress size={40}/>
        </Grid>
      ) : (
        <Grid container alignItems={'center'} justifyContent={'center'}>
          {lastDocument &&<Button onClick={loadNextPage}>Load More</Button>}
        </Grid>
      )}
      </Grid>
    </Grid>
    </>);
};

export default Postings;
