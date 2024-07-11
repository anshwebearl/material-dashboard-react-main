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
  Snackbar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MuiAlert from "@mui/material/Alert";

const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_PROD;

const token = localStorage.getItem("token");

function MembershipPlansTable() {
  const navigate = useNavigate();

  const [memberships, setMemberships] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const columns = [
    { Header: "Name", accessor: "category_name" },
    { Header: "Price", accessor: "price" },
    { Header: "Actions", accessor: "actions" },
    { Header: "View", accessor: "view" },
  ];

  const rows = memberships.map((el) => ({
    category_name: <Author name={el.membership_category} email={el._id} />,
    price: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {el.price}
      </MDTypography>
    ),
    actions: (
      <ButtonGroup variant="outlined" aria-label="button group">
        <IconButton aria-label="delete" size="medium" onClick={() => handleDeleteForm(el._id)}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="medium"
          type="button"
          href={`/membership-plans/edit-plan/${el._id}`}
        >
          <EditIcon color="success" />
        </IconButton>
      </ButtonGroup>
    ),
    view: (
      <MDButton href={`/membership-plans/view-plan/${el._id}`}>
        <MDTypography
          component="a"
          fontWeight="bold"
          variant="caption"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          VIEW
        </MDTypography>
      </MDButton>
    ),
  }));

  const getAllMembershipPlans = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/get-all-memberships`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      setMemberships(jsonData.data);
      console.log(jsonData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/delete-membership?membership_id=${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      if (jsonData.success) {
        getAllMembershipPlans();
        setSnackbarMessage(jsonData.message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
      setOpenDeleteForm(false);
    } catch (error) {
      console.log(error);
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteForm = (_id) => {
    setOpenDeleteForm(true);
    setCategoryId(_id);
  };

  useEffect(() => {
    getAllMembershipPlans();
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
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Membership Plans
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => navigate("add-plan")}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Insert
                </Button>
              </MDBox>
              <MDBox pt={3}>
                {memberships && (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={true}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Footer />

      {/* delete category */}
      <Dialog
        open={openDeleteForm}
        onClose={() => {
          setOpenDeleteForm(false);
          setCategoryName("");
          setCategoryId("");
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteForm(false);
              setCategoryName("");
              setCategoryId("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleDelete(categoryId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default MembershipPlansTable;
