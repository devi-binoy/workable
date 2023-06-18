import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import theme from "../theme";
import { UserAuth } from "../context/AuthContext";
import { apply } from "../services/Apply";
import { getSeeker } from "../services/SeekerDetails";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Form = () => {
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
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApplicationSuccessful, setIsApplicationSuccessful] = useState(false);
  const { user } = UserAuth();
  const uid = user.uid;
  const location = useLocation();
  const jobid = location.state && location.state.jobId;
  console.log(jobid); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seekerData = await getSeeker(uid);
        setName(seekerData.name);
        setResumeLink(seekerData.resumeLink);
        setContactNumber(seekerData.contactNumber);
        setDisabilityCategory(seekerData.disabilityCategory);
        setEmail(seekerData.email);
        setAddress(seekerData.address);
        setDob(seekerData.dob);
        setGender(seekerData.gender);
        setExperience(seekerData.experience);
        setQualification(seekerData.qualification);
      } catch (error) {
        console.error("Error fetching seeker data:", error);
      }
    };

    fetchData();
  }, [uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = {
      userid: uid,
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
      joblistingId: jobid,
      coverLetter: coverLetter,
    };
    console.log(JSON.stringify(details));
    setIsApplying(true);
    await apply(details);
    setIsApplicationSuccessful(true);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    navigate("/myjobs");
  };

  return (
    <>
      <NavBar />
      <Box
        textAlign="left"
        mt={10}
        mb={{ xs: 1, md: -10 }}
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
          Join Our <span style={{ color: "#419D4A" }}>Inclusive </span>{" "}
          Workforce.
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
              required
              disabled
              value={name}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                tabIndex: 0,
              }}
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
              required
              disabled
              value={dob}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: { color: "black" },
                tabIndex: 0,
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
              required
              disabled
              value={gender}
              InputProps={{
                readOnly: true,
                tabIndex: 0,
              }}
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
              value={disabilityCategory}
              onChange={(e) => setDisabilityCategory(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              SelectProps={{
                multiple: true,
                renderValue: (selected) => selected.join(", "),
              }}
              InputProps={{
                tabIndex: 0,
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
              required
              value={resumeLink}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              disabled
              value={contactNumber}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                tabIndex: 0,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              disabled
              value={email}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                tabIndex: 0,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              disabled
              value={address}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                tabIndex: 0,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Experience"
              onChange={(e) => setExperience(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={experience}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Qualification"
              onChange={(e) => setQualification(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              value={qualification}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            label="Cover Letter"
            onChange={(e) => setCoverLetter(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {isApplying ? "Applying..." : "Apply"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {isApplicationSuccessful
            ? "Application sent!"
            : "Application unsuccessful!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isApplicationSuccessful
              ? "Your application has been successfully sent."
              : "There was an error while submitting your application."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form;
