import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  InputLabel,
  Select
} from "@mui/material";
import theme from "../theme";
import { UserAuth } from "../context/AuthContext";
import { useNavigate,useLocation } from "react-router-dom";
import { setSeeker } from "../services/SeekerDetails";

const Register = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [disabilityCategory, setDisabilityCategory] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);
  const location = useLocation();
  useEffect(() => {
    onPageLoad();
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = user.uid;
    const userDetails = {
      name: name,
      resumeLink: resumeLink,
      contactNumber: contactNumber,
      disabilityCategory: disabilityCategory,
      email: email,
      address: address,
      experience: experience,
      qualification: qualification,
      dob: dob,
      gender: gender,
    };
    setIsRegistering(true);
    await setSeeker(userDetails, uid);
    navigate("/");
  };

  return (
    <>
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
          Unlock your potential in an <span style={{ color: "#419D4A" }}>Inclusive </span>{" "}
          Community.
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize={{ xs: "0.rem", sm: "0.75rem", md: "0.85rem", lg: "1rem" }}
          sx={{ color: "#767676", lineHeight: "1.5rem" }}
        >
          A disability should not hinder you from reaching your full potential
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ padding: { xs: 2, sm: 15 } }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              type="date"
              onChange={(e) => setDob(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { color: "black" },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              className="disabilityselect"
              label="Disability Category"
              value={disabilityCategory} // Use the array value
              onChange={(e) => setDisabilityCategory(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              SelectProps={{
                multiple: true,
                renderValue: (selected) => selected.join(", "),
              }}
            >
              <MenuItem value={"Blindness"}>Blindness</MenuItem>
              <MenuItem value={"Low-vision"}>Low-vision</MenuItem>
              <MenuItem value={"Leprosy Cured persons"}>
                Leprosy Cured persons
              </MenuItem>
              <MenuItem value={"Hearing Impairment"}>
                Hearing Impairment
              </MenuItem>
              <MenuItem value={"Locomotor Disability"}>
                Locomotor Disability
              </MenuItem>
              <MenuItem value={"Dwarfism"}>Dwarfism</MenuItem>
              <MenuItem value={"Intellectual Disability"}>
                Intellectual Disability
              </MenuItem>
              <MenuItem value={"Mental Illness"}>Mental Illness</MenuItem>
              <MenuItem value={"Autism Spectrum Disorder"}>
                Autism Spectrum Disorder
              </MenuItem>
              <MenuItem value={"Cerebral Palsy"}>Cerebral Palsy</MenuItem>
              <MenuItem value={"Muscular Dystrophy"}>
                Muscular Dystrophy
              </MenuItem>
              <MenuItem value={"Chronic Neurological conditions"}>
                Chronic Neurological conditions
              </MenuItem>
              <MenuItem value={"Specific Learning Disabilities"}>
                Specific Learning Disabilities
              </MenuItem>
              <MenuItem value={"Multiple Sclerosis"}>
                Multiple Sclerosis
              </MenuItem>
              <MenuItem value={"Speech and Language disability"}>
                Speech and Language disability
              </MenuItem>
              <MenuItem value={"Thalassemia"}>Thalassemia</MenuItem>
              <MenuItem value={"Hemophilia"}>Hemophilia</MenuItem>
              <MenuItem value={"Sickle cell disease"}>
                Sickle cell disease
              </MenuItem>
              <MenuItem
                value={"Multiple Disabilities including deaf-blindness"}
              >
                Multiple Disabilities including deaf-blindness
              </MenuItem>
              <MenuItem value={"Acid Attack victims"}>
                Acid Attack victims
              </MenuItem>
              <MenuItem value={"Parkinson's disease"}>
                Parkinson's disease
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Resume Link"
              onChange={(e) => setResumeLink(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="experience-label">Experience</InputLabel>
            <Select
              labelId="experience-label"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              fullWidth
              variant="outlined"
              required
              displayEmpty
            >
              <MenuItem value="">Select Experience</MenuItem>
              <MenuItem value="0-1 years">0-1 years</MenuItem>
              <MenuItem value="2-4 years">2-4 years</MenuItem>
              <MenuItem value="5+ years">5+ years</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Qualification"
              onChange={(e) => setQualification(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {isRegistering ? "Registering..." : "Register"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Register;
