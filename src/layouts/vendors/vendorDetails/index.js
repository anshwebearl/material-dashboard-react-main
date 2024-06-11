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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "./ProfileInfoCard";

// Overview page components
import Header from "./Header";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultProjectCard from "./DefaultProjectCard";
import MDTypography from "components/MDTypography";
import { Snackbar } from "@mui/material";

function Overview() {
  const { id } = useParams();

  const [vendor, setVendor] = useState({});
  const [tabvalue, setTabValue] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const getVendors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/admin/getVendors/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setVendor(jsonData.vendor[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateVendorStatus = async (status) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/update-vendor-status/${vendor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );
      const jsonData = await response.json();
      if (jsonData.success) {
        setOpenSnackbar(true);
        getVendors();
      } else {
        console.log(jsonData.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Status Changed Successfully"
        autoHideDuration={1200}
      />
      <MDBox mb={2} />
      <Header
        brand_name={vendor.brand_name}
        vendor_type={vendor.vendorCategory?.name}
        tabValue={tabvalue}
        setTabValue={setTabValue}
        vendorStatus={vendor.status}
        updateVendorStatus={updateVendorStatus}
      >
        {tabvalue === 0 ? (
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Basic Information"
                  description={vendor.additional_info || ""}
                  info={{
                    contactPerson: vendor.contact_person_name,
                    mobile: String(vendor.mobile_number),
                    email: vendor.email,
                    location: `${vendor.city}, ${vendor.state}`,
                    pincode: String(vendor.pincode),
                    vendorType: vendor.vendorCategory?.name,
                  }}
                  social={[]}
                  isSocial={false}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Additional information"
                  description=""
                  info={{
                    address: vendor.address,
                    domain: vendor.domain,
                  }}
                  social={[
                    {
                      link: vendor.facebook_url,
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: vendor.Instagram_url,
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                    {
                      link: vendor.website_link,
                      icon: <LanguageIcon />,
                      color: "twitter",
                    },
                  ]}
                  isSocial={true}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
            </Grid>
          </MDBox>
        ) : (
          <>
            <MDBox pt={2} px={2} lineHeight={1.25}>
              <MDTypography variant="h6" fontWeight="medium">
                Projects
              </MDTypography>
              <MDBox mb={1}>
                <MDTypography variant="button" color="text">
                  Architects design houses
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox p={2}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    image={homeDecor1}
                    label="project #2"
                    title="modern"
                    description="As Uber works through a huge amount of internal management turmoil."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "info",
                      label: "view project",
                    }}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </>
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
