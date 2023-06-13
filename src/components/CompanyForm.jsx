import React from "react";
import { Box, Typography, TextField, Button, Grid, useTheme } from "@mui/material";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addCompanyDetails } from "../services/CompanyDetails";
import { resizeFile } from "../services/Resize";
import { addCompanyLogo } from "../services/CompanyDetails";
import { updateCompanyDetails } from "../services/CompanyDetails";
import { useNavigate } from "react-router-dom";


function CompanyForm() {
  const theme = useTheme();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const {user} = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    const company = {
      companyName,
      address,
      numberOfEmployees,
      websiteUrl,
      logo,
    }
    if(logo){ 
      company.logo=await addCompanyLogo(logo,user.uid);
      
    }
    await addCompanyDetails(company,user.uid);
    await updateCompanyDetails(company);
    navigate('/postings');
    console.log(company);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 0.5rem)", 
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 600 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Company Name"
                  fullWidth
                  variant="outlined"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  sx={{
                    fontSize: theme.breakpoints.down("xs")
                      ? "0.4rem"
                      : "0.5rem",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Address"
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{
                    fontSize: theme.breakpoints.down("xs")
                      ? "0.4rem"
                      : theme.breakpoints.down("sm")
                      ? "0.5rem"
                      : "1rem"
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Number of Employees"
                  type="number"
                  fullWidth
                  value={numberOfEmployees}
                  onChange={(e) => setNumberOfEmployees(e.target.value)}
                  variant="outlined"
                  sx={{
                    fontSize: theme.breakpoints.down("xs")
                      ? "0.rem"
                      : theme.breakpoints.down("sm")
                      ? "0.8rem"
                      : "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Website URL"
                  fullWidth
                  variant="outlined"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  sx={{
                    fontSize: theme.breakpoints.down("xs")
                      ? "0.4rem"
                      : theme.breakpoints.down("sm")
                      ? "0.8rem"
                      : "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="outlined" component="label">
                    Upload Logo
                    <input type="file" hidden onChange={async(e)=>{
                      const file = e.target.files[0];
                      const img = await resizeFile(file);
                      setLogo(img);
                    }} />
                  </Button>
                  
                </Box>
               
              </Grid>
              <Grid container display="flex" flexDirection='column' flexWrap='nowrap' alignItems='center' rowSpacing='10px' mt='10px'>
                  <Grid item >
                  {logo && (
                    <img src={URL.createObjectURL(logo)} alt="uploadedlogo" width={100} height={100} />
                  )}
                  </Grid>
              <Grid item xs={12} textAlign="center">
                <Button variant="contained" color="primary" type='submit'>
                  Submit
                </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default CompanyForm;
