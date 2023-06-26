import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const JobCard = ({ job, handleJobCardClick }) => {
  const theme = useTheme();
  const location = useLocation();
  useEffect(() => {
    onPageLoad();
  }, [location.pathname]);

  const {
    JobTitle,
    jobDescription,
    disabilityCategory,
    JobType,
    workMode,
    NumberofOpenings,
    SalaryRange,
    experience,
    numberofapplicants,
    posted_date,
    qualification,
    userid,
    JobLocation,
    status,
    companylogo,
  } = job;

  const handleClick = () => {
    handleJobCardClick(job.id);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleJobCardClick(job.id);
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        margin: "1.5rem auto",
        borderRadius: "10px",
        border: "1px solid #b9c7bd",
        minWidth: "80%",
        boxShadow: "none",
        [theme.breakpoints.up("sm")]: {
          maxWidth: "70%",
        },
        position: "relative",
        transition: "transform 0.1s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          <Box
            sx={{
              marginBottom: { xs: "1rem", sm: 0 },
              alignSelf: { xs: "center", sm: "flex-start" },
            }}
          >
            <img
              src={companylogo}
              alt="Company Logo"
              style={{
                width: "5rem",
                height: "5rem",
              }}
            />
          </Box>
          <Box
            ml={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              marginTop: { xs: "1rem", sm: 0 },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1rem",
                  },
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.9rem",
                  },
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "0.7rem",
                  },
                }}
              >
                {JobTitle}
              </Typography>
              {status && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    [theme.breakpoints.down("md")]: {
                      top: "0.3rem",
                      right: "0.3rem",
                    },
                    [theme.breakpoints.down("sm")]: {
                      top: "0.2rem",
                      right: "0.2rem",
                    },
                    [theme.breakpoints.down("xs")]: {
                      top: "0.2rem",
                      right: "0.2rem",
                    },
                  }}
                >
                  <Chip
                    label={status}
                    variant="outlined"
                    sx={{
                      backgroundColor:
                        status === "Applied"
                          ? "#b8d5f2"
                          : status === "Selected"
                          ? "#9afa91"
                          : status === "Not Selected"
                          ? "#f58b7f"
                          : status === "Shortlist"
                          ? "#f7e09e"
                          : "#b8d5f2",
                      color: "#000",
                      fontSize: "0.9rem",
                      marginTop: "0.9rem",
                      [theme.breakpoints.down("md")]: {
                        fontSize: "0.7rem",
                        marginTop: "0.65rem",
                        height: "0.8rem",
                      },
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "0.6rem",
                        height: "0.7rem",
                      },
                      [theme.breakpoints.down("xs")]: {
                        fontSize: "0.5rem",
                        height: "0.9rem",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                maxWidth: "35rem",
                mt: "0.5rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                [theme.breakpoints.down("md")]: {
                  fontSize: "0.9rem",
                  maxWidth: "100px",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.8rem",
                  maxWidth: "300px",
                  textAlign: "center",
                },
                [theme.breakpoints.down("xs")]: {
                  fontSize: "0.7rem",
                  maxWidth: "200px",
                  textAlign: "left",
                  marginBottom: 1,
                },
              }}
            >
              {jobDescription}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                flexWrap: "wrap",
                gap: "0.5rem",
                marginLeft: { xs: 0, sm: "3rem" },
                [theme.breakpoints.down("md")]: {
                  marginLeft: 0,
                },
                [theme.breakpoints.down("sm")]: {
                  marginLeft: "2rem",
                },
                [theme.breakpoints.down("xs")]: {
                  marginLeft: "1rem",
                },
              }}
            >
              {Array.isArray(disabilityCategory) &&
                disabilityCategory.map((disability, index) => (
                  <Chip
                    key={index}
                    label={disability}
                    sx={{
                      backgroundColor: "#CAFFCF",
                      borderRadius: 3,
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      height: { xs: 24, sm: 32, md: 40 },
                      padding: {
                        xs: "0.25rem 0.5rem",
                        sm: "0.5rem 0.2",
                        md: "0.75rem 0.25rem",
                      },
                      [theme.breakpoints.down("xs")]: {
                        fontSize: "0.7rem",
                        height: 20,
                        padding: "0.15rem 0.3rem",
                      },
                    }}
                  />
                ))}
            </Box>

            <Box display="flex" alignItems="center" marginTop={1}>
              <Typography
                variant="body2"
                sx={{
                  color: "#767676",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "0.9rem",
                  },
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.75rem",
                  },
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "0.6rem",
                  },
                }}
              >
                {JobType} | {workMode} | {JobLocation} | {NumberofOpenings} openings | ₹
                {SalaryRange} | {experience}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
