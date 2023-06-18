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
  Checkbox,
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
import theme from "../theme";
import JobCard from "./JobCard";
import NavBar from "./NavBar";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  // fetchJobListings,
  fetchInitialPage,
  fetchNextPage,
  fetchSortedJobListings,
} from "../services/Home";

function Home() {
  const [jobListings, setJobListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const perPage = 3;
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [disability, setDisability] = useState("");
  const [workMode, setWorkMode] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [postedDate, setPostedDate] = useState([]);
  const [experience, setExperience] = useState([]);
  const [salaryRange, setSalaryRange] = useState([]);
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const { user } = UserAuth();
  const userid = user.uid;

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
    const fetchJobListings = async () => {
      try {
        const { joblistings, lastVisible: fetchedLastVisible } =
          await fetchInitialPage();
        setJobListings(joblistings);
        setLastVisible(fetchedLastVisible);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobListings();
  }, []);

  const loadNextPage = async () => {
    setLoading(true);
    const { jobListings, lastVisible } = await fetchNextPage(lastVisible);
    setJobListings((prevListings) => [...prevListings, ...jobListings]);
    setLastVisible(lastVisible);
    setLoading(false);
  };

  const handleSearch = () => {
    const location = document.getElementById("location-input").value;
    const searchQuery = document.getElementById("search-input").value;
    const selectedDisability =
      document.getElementById("disability-input").value;
    setLocation(location);
    setKeyword(searchQuery);
    selectedDisability(selectedDisability);
  };

  const handleSortByChange = async () => {
    const jobData = await fetchSortedJobListings(sortBy);
    setJobListings(jobData);
  };

  const handleApplyFilters = async () => {
    setOpenDialog(false);
    const filterConditions = [
      { field: "workMode", operator: "in", value: workMode },
      { field: "JobType", operator: "in", value: jobType },
      // { field: "postedDate", operator: "<=", value: postedDate },
      // { field: "experience", operator: "==", value: experience },
      { field: "SalaryRange", operator: "<=", value: salaryRange },
      { field: disability, operator: "in", value: "disabilityCategory" },
      { field: "JobLocation", operator: "==", value: location },
      { field: keyword, operator: "==", value: "JobTitle" },
    ];
    const jobData = await fetchJobListings(filterConditions);
    setJobListings(jobData);
  };

  const handleJobCardClick = (jobId) => {
    navigate("/apply", { state: { jobId } });
  };

  const handleFilterClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        }}
      >
        <Typography
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
          variant="outlined"
          sx={{
            width: { xs: 280, sm: 300, md: 300 },
            background: "white",
          }}
          value={disability}
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

        <Button variant="contained" onClick={handleSearch}>
          Search
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
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                  fontWeight: "bold",
                  textAlign: "center",
                  flex: "1",
                }}
              >
                3177 Jobs
              </Typography>
              <FormControl variant="standard" sx={{ minWidth: "15%" }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by-select"
                  value={sortBy}
                  onChange={handleSortByChange}
                  label="Sort By"
                >
                  <MenuItem value="recent">Most Recent</MenuItem>
                  <MenuItem value="salary">Salary</MenuItem>
                  <MenuItem value="location">Location</MenuItem>
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
              {jobListings
                .slice(currentIndex, currentIndex + perPage)
                .map((job) => (
                  <div
                    key={job.id}
                    style={{
                      display: "inline-block",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleJobCardClick(job.id)}
                  >
                    <JobCard job={job} />
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
              {!isLoading && currentIndex + perPage < jobListings.length && (
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
            variant="h6"
            sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#359E3F" }}
          >
            Filters
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormControl component="fieldset">
              <Typography
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
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Remote
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "-10px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      On Site
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "2px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Hybrid
                    </Typography>
                  }
                />
              </FormGroup>

              <Typography
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
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Full-Time
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "-10px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Part-Time
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "2px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Contract
                    </Typography>
                  }
                />
              </FormGroup>

              <Typography
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
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      All Time
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "-10px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Last 24 hours
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "-10px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Last 7 days
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "2px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Last month
                    </Typography>
                  }
                />
              </FormGroup>

              {/* <Typography
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
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Entry-Level
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "-10px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Intermediate
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "-10px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Mid-Level
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{ marginBottom: "2px" }}
                  control={
                    <Checkbox
                      size="small"
                      sx={{ paddingLeft: "8px", color: "#3AAE45" }}
                    />
                  }
                  label={
                    <Typography variant="heading2" sx={{ fontSize: "0.9rem" }}>
                      Senior or Executive Level
                    </Typography>
                  }
                />
              </FormGroup> */}

              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "-8px",
                }}
              >
                Salary
              </Typography>
              <Slider defaultValue={1000} aria-label="Salary" />
            </FormControl>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            color="primary"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
