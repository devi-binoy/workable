import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import theme from "../theme";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import { fetchJobDetails } from "../services/Job";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function JobPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.state && location.state.jobId;
  const [jobData, setJobData] = useState({});
  const { user } = UserAuth();
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await fetchJobDetails(jobId);
        console.log("Job DATA:", data);
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (jobId) {
      fetchJobData();
    }
  }, [jobId]);

  if (!jobData) {
    return <div>Loading...</div>;
  }

  const handleApplyClick = () => {
    if (user) {
      navigate("/apply", { state: { jobId, jobTitle: jobData.jobTitle } });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <NavBar />
      <Grid
        container
        spacing={3}
        ml={4}
        mr={4}
        mt={12}
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)",
          borderRadius: "9px",
          p: "2rem",
          [theme.breakpoints.down("md")]: {
            mt: 14,
          },
          [theme.breakpoints.down("sm")]: {
            pl: "0rem",
            pr: "0rem",
          },
        }}
      >
        <Grid item>
          <Avatar
            variant="square"
            alt="Company Logo"
            src={jobData.companylogo}
            xs={6}
            sx={{
              width: "9rem",
              height: "9rem",
              mt: "1rem",
              ml: "2rem",
              [theme.breakpoints.down("sm")]: {
                width: "7rem",
                height: "7rem",
                mt: "0.5rem",
                ml: "0.5rem",
              },
            }}
          />
        </Grid>
        <Grid
          container
          sx={{
            flexDirection: "row",
            width: "75%",
            justifyContent: "space-between",
            [theme.breakpoints.down("md")]: {
              width: 0,
              flexDirection: "column",
            },
          }}
        >
          <Grid
            container
            sx={{
              mt: "1.5rem",
              flexDirection: "column",
              [theme.breakpoints.down("sm")]: {
                mt: "1rem",
              },
            }}
          >
            <Typography
              tabIndex={0}
              lg={12}
              variant="heading2"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",
                [theme.breakpoints.down("md")]: {
                  hyphens: "auto",
                  fontSize: "2rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1rem",
                },
              }}
            >
              {jobData.companyname}
            </Typography>
            <Typography
              tabIndex={0}
              lg={12}
              variant="heading1"
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                [theme.breakpoints.down("md")]: {
                  hyphens: "auto",
                  fontSize: "1.5rem",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.4rem",
                },
              }}
            >
              {jobData.JobTitle}
            </Typography>
          </Grid>
          <Button
            variant="contained"
            sx={{
              mt: "2rem",
              fontSize: "1rem",
              height: "2.5rem",
              boxShadow: "none",
              borderRadius: "10px",
              width: "auto",
              [theme.breakpoints.down("md")]: {
                fontSize: "0.9rem",
                height: "2rem",
                borderRadius: "5px",
              },
              [theme.breakpoints.down("sm")]: {
                mt: "0.3rem",
                fontSize: "0.7rem",
                height: "1.6rem",
                borderRadius: "5px",
              },
              [theme.breakpoints.down("xs")]: {
                fontSize: "0.7rem",
                height: "1.4rem",
              },
            }}
            onClick={handleApplyClick}
          >
            Apply
          </Button>
        </Grid>
        <Grid
          container
          lg={12}
          sm={12}
          spacing={3}
          sx={{
            ml: "2.5rem",
            mr: "2.5rem",
            mt: "1rem",
            flexDirection: "column",
            [theme.breakpoints.down("sm")]: {
              ml: "1.1rem",
            },
          }}
        >
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            {" "}
            Posted on {jobData.posted_date?.toDate().toString()} •{" "}
            {jobData.numberofapplicants} Applicants • {jobData.NumberofOpenings}{" "}
            Openings{" "}
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mt: "1rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Job Description
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            {jobData.jobDescription}
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mt: "1rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Disability Categories
          </Typography>
          <Grid
            container
            xs={12}
            sx={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {jobData.disabilityCategory &&
            Array.isArray(jobData.disabilityCategory) ? (
              jobData.disabilityCategory.map((disability, index) => (
                <Typography
                  tabIndex={0}
                  key={index}
                  sx={{
                    backgroundColor: "secondary.main",
                    pl: "1rem",
                    pr: "1rem",
                    pt: "0.3rem",
                    pb: "0.3rem",
                    mr: "1rem",
                    mt: "1rem",
                    borderRadius: "5px",
                    fontWeight: "medium",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  {disability}
                </Typography>
              ))
            ) : (
              <Typography tabIndex={0}>..</Typography>
            )}
          </Grid>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mt: "1rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Job Location
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            {jobData.JobLocation}
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mt: "1rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Experience Level
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            {jobData.experience}
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mt: "1rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Qualification Level
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            {jobData.qualification}
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              mt: "1rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1rem",
              },
            }}
          >
            Salary
          </Typography>
          <Typography
            tabIndex={0}
            lg={12}
            variant="heading2"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8rem",
              },
            }}
          >
            {jobData.SalaryRange}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default JobPost;
