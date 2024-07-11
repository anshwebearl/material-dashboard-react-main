/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { List, ListItem, ListItemText } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useLocation } from "react-router-dom";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_PROD;

const token = localStorage.getItem("token");

function ViewMembershipPlan() {
  const locator = useLocation();

  const [membershipCategory, setMembershipCategory] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState([]);

  const fetchMembershipData = async () => {
    const locatorArray = locator.pathname.split("/");
    const _id = locatorArray[locatorArray.length - 1];
    try {
      const response = await fetch(`${BASE_URL}/admin/get-membership?membership_id=${_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      if (jsonData.success) {
        console.log(jsonData);
        setMembershipCategory(jsonData.data.membership_category);
        setPrice(jsonData.data.price);
        const tempFeatures = jsonData.data.features.map((el) => el.name);
        setFeatures(tempFeatures);
      }
      setOpenDeleteForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembershipData();
  }, [locator.pathname]);

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
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{
                  position: "relative",
                }}
              >
                <MDTypography variant="h6" color="white">
                  View Membership Plans
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <label htmlFor="">Category</label>
                      <MDTypography>{membershipCategory}</MDTypography>
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Price</label>
                      <MDTypography>{price}</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox>
                      <label>Features</label>
                      <List>
                        {features.map((feature, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={feature} color="secondary" />
                          </ListItem>
                        ))}
                      </List>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewMembershipPlan;
