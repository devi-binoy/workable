import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  FormControl,
  FormGroup,
  FormControlLabel,
  Radio,
  Slider,
  InputLabel,
  Select,
  IconButton,
  Grid,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FilterList,
  LocationOnOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { visuallyHidden } from "@mui/utils";
import theme from "../theme";
import JobCard from "./JobCard";
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { fetchJobListings, fetchNextPage } from "../services/Home";

function Home() {
  const [jobListings, setJobListings] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [disability, setDisability] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [jobType, setJobType] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [experience, setExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState(0);
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const [filterConditions, setFilterConditions] = useState([]);
  const { user } = UserAuth();

  const disabilityCategories = [
    "Leprosy Cured persons",
    "Hearing Impairment",
    "Locomotor Disability",
    "Dwarfism",
    "Intellectual Disability",
    "Mental Illness",
    "Autism Spectrum Disorder",
    "Cerebral Palsy",
    "Muscular Dystrophy",
    "Chronic Neurological conditions",
    "Specific Learning Disabilities",
    "Multiple Sclerosis",
    "Speech and Language disability",
    "Thalassemia",
    "Hemophilia",
    "Sickle cell disease",
    "Multiple Disabilities including deaf-blindness",
    "Acid Attack victims",
    "Parkinson's disease",
  ];

  useEffect(() => {
    const fetchInitialListings = async () => {
      const { jobListings, lastVisible, totalCount } = await fetchJobListings();
      setTotalCount(totalCount);
      setJobListings(jobListings);
      setLastVisible(lastVisible);
    };
    fetchInitialListings();
  }, []);

  const loadNextPage = async () => {
    if (lastVisible) {
      const {
        jobListings: nextPageListings,
        lastVisible: nextPageLastVisible,
      } = await fetchNextPage(lastVisible, sortBy, filterConditions);
      setJobListings((prevListings) => [...prevListings, ...nextPageListings]);
      setLastVisible(nextPageLastVisible);
      setHasMore(nextPageListings.length > 0);
    }
  };

  const handleFilters = async () => {
    setOpenDialog(false);
    const filterConditions = [];

    if (workMode) {
      filterConditions.push({
        field: "workMode",
        operator: "==",
        value: workMode,
      });
    }

    if (jobType) {
      filterConditions.push({
        field: "JobType",
        operator: "==",
        value: jobType,
      });
    }

    if (experience) {
      filterConditions.push({
        field: "experience",
        operator: "==",
        value: experience,
      });
    }

    if (salaryRange) {
      filterConditions.push({
        field: "SalaryRange",
        operator: ">=",
        value: salaryRange,
      });
    }

    if (postedDate === "last24") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const startTimestamp = Timestamp.fromDate(currentDate);

      filterConditions.push({
        field: "posted_date",
        operator: ">=",
        value: startTimestamp,
      });
    } else if (postedDate === "last7") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 7);
      const startTimestamp = Timestamp.fromDate(currentDate);

      filterConditions.push({
        field: "posted_date",
        operator: ">=",
        value: startTimestamp,
      });
    } else if (postedDate === "last30") {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 30);
      const startTimestamp = Timestamp.fromDate(currentDate);

      filterConditions.push({
        field: "posted_date",
        operator: ">=",
        value: startTimestamp,
      });
    }

    if (disability) {
      filterConditions.push({
        field: "disabilityCategory",
        operator: "array-contains",
        value: disability,
      });
    }
    if (location) {
      filterConditions.push({
        field: "JobLocation",
        operator: "==",
        value: location,
      });
    }
    if (keyword) {
      filterConditions.push({
        field: "JobTitle",
        operator: "==",
        value: keyword,
      });
    }
    setFilterConditions(filterConditions);
    const jobData = await fetchJobListings(sortBy, filterConditions);
    setJobListings(jobData.jobListings);
    setLastVisible(jobData.lastVisible);
    setTotalCount(jobData.totalCount);
  };

  const handleReset = async () => {
    setDisability("");
    setWorkMode("");
    setJobType("");
    setPostedDate("");
    setExperience("");
    setSalaryRange(0);
    setLocation("");
    setKeyword("");
    setSortBy("");
    setFilterConditions([]);
    const { jobListings, lastVisible, totalCount } = await fetchJobListings();
    setJobListings(jobListings);
    setLastVisible(lastVisible);
    setHasMore(true);
    setTotalCount(totalCount);
  };

  const handleSortBy = async (event) => {
    const sortByValue = event.target.value;
    setSortBy(sortByValue);

    try {
      const jobData = await fetchJobListings(sortBy, filterConditions);
      setJobListings(jobData.jobListings);
      setLastVisible(jobData.lastVisible);
      setTotalCount(jobData.totalCount);
    } catch (error) {
      console.error("Error fetching sorted job listings:", error);
    }
  };

  const handleJobCardClick = (jobId) => {
    navigate("/job", { state: { jobId } });
  };

  const handleFilterClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleWorkModeChange = (event) => {
    setWorkMode(event.target.value);
  };

  useEffect(() => {
    console.log("kkak", workMode, jobType);
  }, [workMode, jobType, experience]);

  const handleJobTypeChange = (event) => {
    console.log(event.target.value);
    setJobType(event.target.value);
    console.log("jobtype", jobType);
  };

  const handlePostedDateChange = (event) => {
    setPostedDate(event.target.value);
    console.log("date", postedDate);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleSalaryRangeChange = (event, value) => {
    setSalaryRange(value);
  };

  return (
    <div>
      <NavBar />
      <Box
        textAlign="left"
        mt={10}
        mb={2}
        sx={{
          marginLeft: { xs: "22px", md: "5%" },
          marginRight: { xs: "22px", md: "5%" },
          overflow: "hidden",
          [theme.breakpoints.down("md")]: {
            mt: 14,
          }
        }}
        
      >
       <Typography
              tabIndex={0}
          variant="heading1"
          sx={{
            fontWeight: "bold",
            color: "#2a2a2a",
            mb: 1,
            marginTop: "15%",
            [theme.breakpoints.down("md")]: {
              fontSize: "1.9rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.75rem",
            },
            [theme.breakpoints.down("xs")]: {
              fontSize: "1.5rem",
            },
          }}
        >
          Find <span style={{ color: "#419D4A" }}>Inclusive</span> Jobs Today
        </Typography>
       <Typography
              tabIndex={0}
          variant="subtitle1"
          fontSize={{ xs: "0.rem", sm: "0.75rem", md: "0.85rem", lg: "1rem" }}
          sx={{ color: "#767676", lineHeight: "1.5rem" }}
        >
          A disability should not hinder you from reaching your full potential
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          marginTop: { xs: "12px", md: "3%" },
          flexWrap: "wrap",
        }}
      >
       <TextField
  id="disability-input"
  select
  label="Disability"
  title="Disability Drop Down"
  variant="outlined"
  sx={{
    width: { xs: 280, sm: 300, md: 300 },
    background: "white",
    [theme.breakpoints.down("xs")]: {
      width : 280,      
    },
  }}
  value={disability}
  onChange={(e) => setDisability(e.target.value)}
  labelId="disability-label"
  aria-label="Disability Drop Down" 
>
  {disabilityCategories.map((category) => (
    <MenuItem key={category} value={category}>
      {category}
    </MenuItem>
  ))}
</TextField>


        <TextField
          id="location-input"
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            width: { xs: 280, sm: 300 },
            background: "white",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="search-input"
          label="Search for Jobs"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{
            width: { xs: 280, sm: 300 },
            background: "white",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "12px",
          gap: "16px",
        }}
      >
        <Button variant="contained" onClick={handleFilters}>
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleReset}
          color="inherit"
          style={{
            backgroundColor: "transparent",
            padding: "8px",
            minWidth: "unset",
            border: "1px solid #ccc",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          sx={{
            fontSize: "0.8rem",
            textTransform: "none",
          }}
        >
          <RotateLeftIcon sx={{ fontSize: "1rem" }} />
          Reset
        </Button>
      </Box>

      <Grid container justifyContent="center" mt={10}>
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          sx={{ minWidth: "70%" }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: "9px",
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box>
                <IconButton
                  color="primary"
                  aria-label="filter"
                  onClick={handleFilterClick}
                  sx={{ padding: "6px", marginLeft: "-8px" }}
                >
                  <FilterList fontSize="large" />
                 <Typography
                    variant="subtitle1"
                    sx={{
                      marginLeft: "8px",
                      [theme.breakpoints.down("sm")]: {
                        display: "none",
                      },
                    }}
                  >
                    Filter By
                  </Typography>
                </IconButton>
              </Box>
             <Typography
              tabIndex={0}
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                  fontWeight: "bold",
                  textAlign: "center",
                  flex: "1",
                }}
              >
                {totalCount} Jobs
              </Typography>
              <FormControl variant="standard" sx={{ minWidth: "15%" }}>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  label="Sort Options"
                  id="sort-by-select"
                  value={sortBy}
                  onChange={handleSortBy}
                  aria-labelledby="sort-by-label"
                  aria-describedby="press to sort by most recent, salary or nuber of opernings"
                >
                  <MenuItem value="recent">Most Recent</MenuItem>
                  <MenuItem value="salary">Salary</MenuItem>
                  <MenuItem value="openings">Openings</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  // onClick={() => handleJobCardClick(job.id)}
                >
                  <JobCard job={job} handleJobCardClick={handleJobCardClick} />
                </div>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: 2, sm: 4 },
              }}
            >
              {hasMore && (
                <Button
                  variant="outlined"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                  onClick={loadNextPage}
                >
                  Load More
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
         <Typography
              tabIndex={0}
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#359E3F" }}
          >
            Filters
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
           <Typography
              tabIndex={0}
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "-5px",
              }}
            >
              Work Mode
            </Typography>
            <FormGroup>
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    value="Remote"
                    checked={workMode === "Remote"}
                    onChange={handleWorkModeChange}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Remote
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    value="OnSite"
                    checked={workMode === "OnSite"}
                    onChange={handleWorkModeChange}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    On Site
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "2px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    value="Hybrid"
                    checked={workMode === "Hybrid"}
                    onChange={handleWorkModeChange}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Hybrid
                  </Typography>
                }
              />
            </FormGroup>

           <Typography
              tabIndex={0}
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "-5px",
              }}
            >
              Type of Employment
            </Typography>
            <FormGroup>
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handleJobTypeChange}
                    value="Full-Time"
                    name="employmentType"
                    checked={jobType === "Full-Time"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Full-Time
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handleJobTypeChange}
                    value="Part-Time"
                    name="employmentType"
                    checked={jobType === "Part-Time"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Part-Time
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "2px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handleJobTypeChange}
                    value="Contract"
                    name="employmentType"
                    checked={jobType === "Contract"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Contract
                  </Typography>
                }
              />
            </FormGroup>

           <Typography
              tabIndex={0}
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "-5px",
              }}
            >
              Date of Posting
            </Typography>
            <FormGroup>
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handlePostedDateChange}
                    value="all"
                    checked={postedDate === "all"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    All Time
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handlePostedDateChange}
                    value="last24"
                    checked={postedDate === "last24"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Last 24 hours
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handlePostedDateChange}
                    value="last7"
                    checked={postedDate === "last7"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Last 7 days
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "2px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    onChange={handlePostedDateChange}
                    value="last30"
                    checked={postedDate === "last30"}
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    Last month
                  </Typography>
                }
              />
            </FormGroup>

           <Typography
              tabIndex={0}
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "-5px",
              }}
            >
              Experience Level
            </Typography>
            <FormGroup>
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    checked={experience === "0-1 years"}
                    onChange={handleExperienceChange}
                    value="0-1 years"
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    0-1 years
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "-10px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    checked={experience === "2-4 years"}
                    onChange={handleExperienceChange}
                    value="2-4 years"
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    2-4 years
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ marginBottom: "2px" }}
                control={
                  <Radio
                    size="small"
                    sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    checked={experience === "5+ years"}
                    onChange={handleExperienceChange}
                    value="5+ years"
                  />
                }
                label={
                 <Typography
              tabIndex={0} variant="heading2" sx={{ fontSize: "0.9rem" }}>
                    5+ years
                  </Typography>
                }
              />
            </FormGroup>
           <Typography
              tabIndex={0}
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "-8px",
              }}
            >
              Salary
            </Typography>
            <Slider
              value={salaryRange}
              onChange={handleSalaryRangeChange}
              min={10000}
              max={1000000}
              step={10000}
              marks={[
                { value: 10000, label: "10k" },
                { value: 500000, label: "5L" },
                { value: 1000000, label: "10L" },
              ]}
              aria-label="Salary"
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleFilters} variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
