/* eslint-disable react/prop-types */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";

function Header({
  children,
  brand_name,
  tabValue,
  setTabValue,
  vendorStatus,
  updateVendorStatus,
  vendor_type,
}) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (status) => {
    updateVendorStatus(status);
    handleClose();
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              sx={{ display: "flex", alignItems: "center", gap: "30px" }}
            >
              <MDBox>
                <MDTypography variant="h5" fontWeight="medium">
                  {brand_name}
                </MDTypography>
                <MDTypography variant="caption" sx={{ fontSize: "15px" }}>
                  {vendor_type}
                </MDTypography>
              </MDBox>
              <MDButton
                variant="contained"
                color={
                  vendorStatus === "pending"
                    ? "warning"
                    : vendorStatus === "approved"
                    ? "success"
                    : "error"
                }
                size="small"
                onClick={handleButtonClick}
              >
                <MDTypography variant="subtitle" color="white" sx={{ fontSize: "12px" }}>
                  {vendorStatus.toUpperCase()}
                </MDTypography>
              </MDButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleMenuItemClick("pending")}>Pending</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("approved")}>Approved</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("rejected")}>Rejected</MenuItem>
              </Menu>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                selectionFollowsFocus={true}
                value={tabValue}
                onChange={handleSetTabValue}
                indicatorColor="primary"
              >
                <Tab
                  label="Home"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                {vendor_type === "Venues" && (
                  <Tab
                    label="Menu"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        local_dining
                      </Icon>
                    }
                  />
                )}
                {vendor_type === "Venues" && (
                  <Tab
                    label="Banquets"
                    icon={
                      <Icon fontSize="small" sx={{ mt: -0.25 }}>
                        landscape
                      </Icon>
                    }
                  />
                )}
                (
                <Tab
                  label="Projects"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      work
                    </Icon>
                  }
                />
                )
                {/* <Tab
                  label="Settings"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                /> */}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

export default Header;
