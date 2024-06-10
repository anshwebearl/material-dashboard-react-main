/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField, IconButton, CardContent, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Tables() {
  const token = document.cookie.valueOf("token").split("=")[1];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilteredUsers, setShowFilteredUsers] = useState(false);

  const handleFilter = (e) => {
    setShowFilteredUsers(true);

    const text = e.target.value;
    setSearch(text);
    const filteredData = users.filter((ev) => ev.name.includes(text));
    console.log(filteredData);

    setFilteredUser(filteredData);
  };

  const getUserByID = async () => {
    let filtered = users.filter((el) => el.name.startsWith(search));
    setFilteredUser(filtered);
  };

  const getUsers = async () => {
    try {
      const response = await fetch("https://ecomm-backend-2xs6.onrender.com/api/admin/users", {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setUsers(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                bgColor="white"
                borderRadius="lg"
                coloredShadow="dark"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h4" color="info">
                  Users Table
                </MDTypography>
                <Grid
                  sx={{
                    display: "flex",
                    backgroundColor: "white",
                    padding: "5px",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="medium"
                    placeholder="Search..."
                    value={search}
                    onChange={handleFilter}
                    sx={{ color: "white" }}
                  />
                  <IconButton onClick={getUserByID}>
                    <SearchIcon />
                  </IconButton>
                  {showFilteredUsers && (
                    <IconButton
                      onClick={() => {
                        setFilteredUser([]);
                        setShowFilteredUsers(false);
                        setSearch("");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Grid>
              </MDBox>
              <Grid
                p={3}
                container
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {showFilteredUsers
                  ? filteredUsers.map((el) => (
                      <Card
                        key={el._id}
                        sx={{
                          bgcolor: "#ededed",
                          width: "fit-content",
                          maxWidth: "220px",
                          flexGrow: 1,
                        }}
                        variant="elevation"
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <Typography variant="h5" color="text.primary">
                            {el.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {el.email}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            variant="body2"
                          >
                            <LocalPhoneIcon />
                            {el.phone}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            variant="subtitle1"
                          >
                            <LocationOnIcon />
                            {el.city}, {el.state}, {el.country}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))
                  : users.map((el) => (
                      <Card
                        key={el._id}
                        sx={{
                          bgcolor: "#ededed",
                          width: "fit-content",
                          maxWidth: "220px",
                          flexGrow: 1,
                        }}
                        variant="elevation"
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <Typography variant="h5" color="text.primary">
                            {el.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {el.email}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            variant="body2"
                          >
                            <LocalPhoneIcon />
                            {el.phone}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            variant="subtitle1"
                          >
                            <LocationOnIcon />
                            {el.city}, {el.state}, {el.country}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
