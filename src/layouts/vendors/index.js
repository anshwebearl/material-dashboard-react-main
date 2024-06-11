/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ButtonGroup,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "./DataTable";

import MDAvatar from "components/MDAvatar";
import team2 from "assets/images/team-2.jpg";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";

const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

function Tables() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [vendorType, setVendorType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [isFilter, setIsFilter] = useState(false);

  const columns = [
    { Header: "Vendor", accessor: "vendor", width: "5%" },
    { Header: "Contact Person", accessor: "contact_person", width: "5%" },
    { Header: "Vendor Type", accessor: "vendor_type", width: "5%" },
    { Header: "State", accessor: "state", width: "5%" },
    { Header: "City", accessor: "city", width: "5%" },
    { Header: "Action", accessor: "action", width: "5%" },
  ];

  const rows = (isFilter ? filteredVendors : vendors).map((el) => ({
    vendor: <Author name={el.brand_name} email={el.additional_email} image={team2} />,
    contact_person: <Author name={el.contact_person_name} email={el.email} image={team2} />,
    vendor_type: (
      <MDTypography component="a" variant="button" color="text" fontWeight="bold">
        {el.vendorCategory.name}
      </MDTypography>
    ),
    state: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {/* {new Date(el.createdAt).toLocaleDateString("en-GB")} */}
        {el.state}
      </MDTypography>
    ),
    city: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {/* {new Date(el.updatedAt).toLocaleDateString("en-GB")} */}
        {el.city}
      </MDTypography>
    ),
    action: (
      <MDTypography
        component="a"
        onClick={() => navigate(`/vendors/${el._id}`)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        VIEW
      </MDTypography>
    ),
  }));

  const handleFilter = () => {
    setIsFilter(true);
    if (!vendorType && !state && !city) {
      setIsFilter(false);
    }
    let filteredData = vendors;
    if (vendorType) {
      filteredData = filteredData.filter((el) => el.vendorCategory.name === vendorType);
    }
    if (state) {
      filteredData = filteredData.filter((el) => el.state === state);
    }
    if (city) {
      filteredData = filteredData.filter((el) => el.city === city);
    }
    setFilteredVendors(filteredData);
  };

  const getVendors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/admin/getVendors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setVendors(jsonData.vendor);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmin = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/admin/getAdmin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (!jsonData.success) {
        navigate("/authentication/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [vendorType, state, city]);

  useEffect(() => {
    getVendors();
    getAdmin();
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Vendors Table
                </MDTypography>
              </MDBox>
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "20px",
                  paddingTop: "10px",
                }}
              >
                {(vendorType || state || city) && (
                  <MDButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      setVendorType("");
                      setCity("");
                      setState("");
                    }}
                  >
                    <MDTypography variant="caption" color="white">
                      CLEAR
                    </MDTypography>
                  </MDButton>
                )}
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  vendorType={vendorType}
                  setVendorType={setVendorType}
                  state={state}
                  setState={setState}
                  city={city}
                  setCity={setCity}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
