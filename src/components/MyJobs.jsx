import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import NavBar from "./NavBar";
import { Typography, Box, useTheme } from "@mui/material";
import { UserAuth } from "../context/AuthContext";
import { getApplied } from "../services/Apply";
import { useLocation } from "react-router-dom";

function MyJobs() {
  const theme = useTheme();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = UserAuth();
  const userid = user.uid;
  const location = useLocation();
  useEffect(() => {
    onPageLoad();
  }, [location.pathname]);
  useEffect(() => {
    getApplied(userid)
      .then((jobs) => {
        setJobs(jobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Box
        mt={9}
        sx={{
          px: { xs: 2, sm: 4 },
          [theme.breakpoints.down("md")]: {
            mt: 14,
          },
        }}
      >
        <Typography
          tabIndex={0}
          sx={{
            fontWeight: "600",
            [theme.breakpoints.down("md")]: {
              fontSize: "3.5rem",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "2.5rem",
            },
            [theme.breakpoints.down("xs")]: {
              fontSize: "1.5rem",
            },
            lineHeight: { xs: "40px", sm: "80px" },
            textAlign: "center",
            mb: 2,
          }}
        >
          My Jobs List
        </Typography>

        {isLoading ? (
          <Typography
            tabIndex={0}
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "600",
              textAlign: "center",
              mb: 2,
            }}
          >
            Loading...
          </Typography>
        ) : jobs.length === 0 ? (
          <Typography
            tabIndex={0}
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "600",
              textAlign: "center",
              mb: 2,
            }}
          >
            No jobs available.
          </Typography>
        ) : (
          jobs.map((job, index) => <JobCard job={job} key={index} />)
        )}
      </Box>
    </>
  );
}

export default MyJobs;
