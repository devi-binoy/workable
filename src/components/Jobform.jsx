import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { UserAuth } from "../context/AuthContext";
import { addJobDetails } from "../services/JobDetails";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import theme from '../theme';

const Form = () => {
  const [JobTitle, setJobTitle] = useState('');
  const [JobLocation, setJobLocation] = useState('');
  const [SalaryRange, setSalaryRange] = useState(0);
  const [disabilityCategory, setDisabilityCategory] = useState([]);
  const [JobType, setJobType] = useState('');
  const [ApplicationDeadline, setApplicationDeadline] = useState('');
  const [NumberofOpenings, setNumberofOpenings] = useState(0);
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [workMode, setWorkMode] = useState('');
  const {user} = UserAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Handle form submission logic here
    const job = {
      JobTitle,
      JobLocation,
      SalaryRange,
      disabilityCategory,
      JobType,
      ApplicationDeadline,
      NumberofOpenings,
      experience,
      qualification,
      jobDescription,
      workMode,
    }
    await addJobDetails(job,user);
    console.log(job);


    // Reset form fields
    setJobTitle('');
    setJobLocation('');
    setSalaryRange(0);
    setDisabilityCategory([]);
    setJobType('');
    setApplicationDeadline('');
    setNumberofOpenings(0);
    setExperience('');
    setQualification('');
    setJobDescription('');
    setWorkMode('');
  };

  return (<>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} 
        sx={{ 
         padding: { xs: 3, sm: 15 },
          [theme.breakpoints.down('xs')]: {
            padding: 3,
          },
          }}>
      
      <Grid item xs={12} sm={12} sx={{ width: '100%' }}>
      <Typography variant="subtitle1" fontWeight="bold" 
      sx={{
        fontSize : '1.5em',
        mt: 5,
      }}
      >
        Post a New Job
      </Typography>
      </Grid>
        <Grid item sm={12} sx={{ width: '100%'}}>
          <TextField
            value={JobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            fullWidth
            required
            label="Job Title"
            variant="outlined"
          />
        </Grid>


        <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
          <TextField
            value={JobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            fullWidth
            required
            label="Job Location"
            variant="outlined"
          />
        </Grid>


        <Grid item xs={12} sm={6}sx={{ width: '100%' }} >
          <TextField
            value={SalaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            fullWidth
            required
            type='number'
            label="Salary Range"
            variant="outlined"
          />
        </Grid>


        <Grid item xs={12} sm={12} sx={{ width: '100%' }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-required-label">Disability Category *</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              multiple
              required
              label="Disability Category"
              value={disabilityCategory}
              onChange={(e) => setDisabilityCategory(e.target.value)}
            >
              <MenuItem value={"Blindness"}>Blindness</MenuItem>
              <MenuItem value={"Low-vision"}>Low-vision</MenuItem>
              <MenuItem value={"Leprosy Cured persons"}>Leprosy Cured persons</MenuItem>
              <MenuItem value={"Hearing Impairment"}>Hearing Impairment</MenuItem>
              <MenuItem value={"Locomotor Disability"}>Locomotor Disability</MenuItem>
              <MenuItem value={"Dwarfism"}>Dwarfism</MenuItem>
              <MenuItem value={"Intellectual Disability"}>Intellectual Disability</MenuItem>
              <MenuItem value={"Mental Illness"}>Mental Illness</MenuItem>
              <MenuItem value={"Autism Spectrum Disorder"}>Autism Spectrum Disorder</MenuItem>
              <MenuItem value={"Cerebral Palsy"}>Cerebral Palsy</MenuItem>
              <MenuItem value={"Muscular Dystrophy"}>Muscular Dystrophy</MenuItem>
              <MenuItem value={"Chronic Neurological conditions"}>Chronic Neurological conditions</MenuItem>
              <MenuItem value={"Specific Learning Disabilities"}>Specific Learning Disabilities</MenuItem>
              <MenuItem value={"Multiple Sclerosis"}>Multiple Sclerosis</MenuItem>
              <MenuItem value={"Speech and Language disability"}>Speech and Language disability</MenuItem>
              <MenuItem value={"Thalassemia"}>Thalassemia</MenuItem>
              <MenuItem value={"Hemophilia"}>Hemophilia</MenuItem>
              <MenuItem value={"Sickle cell disease"}>Sickle cell disease</MenuItem>
              <MenuItem value={"Multiple Disabilities including deaf-blindness"}>Multiple Disabilities including deaf-blindness</MenuItem>
              <MenuItem value={"Acid Attack victims"}>Acid Attack victims</MenuItem>
              <MenuItem value={"Parkinson's disease"}>Parkinson's disease</MenuItem>
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-required-label">Job Type *</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              required
              label="Job Type"
              value={JobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
              <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
              <MenuItem value={"Contract"}>Contract</MenuItem>
            </Select>
          </FormControl>
        </Grid>



        <Grid item xs={12} sm={6}sx={{ width: '100%' }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker label="Application Deadline"
              onChange={(date) => {
                // const standardDate = new Date(date._t)
                // const formattedDate = moment(standardDate).format('YYYY-MM-DD')
                setApplicationDeadline(date._d);
                console.log(date._d)
              }}
              fullWidth
              sx={{ width: '100%'}}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-required-label">Work Mode *</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              required
              label="Work Mode"
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            >
              <MenuItem value={"Remote"}>Remote</MenuItem>
              <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
              <MenuItem value={"On-Site"}>On-Site</MenuItem>
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
          <TextField
            value={NumberofOpenings}
            onChange={(e) => setNumberofOpenings(e.target.value)}
            fullWidth
            required
            type='number'
            label="Number of Openings"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-required-label">Experience *</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              required
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <MenuItem value={"0-1 years"}>0-1 years</MenuItem>
              <MenuItem value={"2-4 years"}>2-4 years</MenuItem>
              <MenuItem value={"5+ years"}>5+ years</MenuItem>
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-required-label">Qualification *</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              required
              label="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            >
              <MenuItem value={"Higher Secondary Education"}>Higher Secondary Education</MenuItem>
              <MenuItem value={"Diploma"}>Diploma</MenuItem>
              <MenuItem value={"Bachelor's Degree"}>Bachelor's Degree</MenuItem>
              <MenuItem value={"Master's Degree"}>Master's Degree</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ width: '100%' }}>
          <TextField
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            fullWidth
            required
            label="Job Description"
            variant="outlined"
            multiline
            rows={6}
          />
        </Grid>

        
        <Grid item container justifyContent={'flex-end'} xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Post Job
          </Button>
        </Grid>
      </Grid>
    </form>
  </>
  );
};

export default Form;
