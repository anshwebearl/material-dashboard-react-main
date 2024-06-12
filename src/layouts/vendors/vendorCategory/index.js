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

function VendorCategoryTable() {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_BASE_URL_DEV
      : process.env.REACT_APP_API_BASE_URL_PROD;

  const [openInsertForm, setOpenInsertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const columns = [
    { Header: "Name", accessor: "category_name", width: "20%" },
    { Header: "Created", accessor: "createdAt", width: "10%" },
    { Header: "Last Updated", accessor: "updatedAt", width: "10%" },
    { Header: "Actions", accessor: "actions", width: "10%" },
    { Header: "View", accessor: "view", width: "15%" },
  ];

  const rows = categories.map((el) => ({
    category_name: <Author name={el.name} email={el._id} />,
    createdAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {new Date(el.createdAt).toLocaleDateString("en-GB")}
      </MDTypography>
    ),
    updatedAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {new Date(el.updatedAt).toLocaleDateString("en-GB")}
      </MDTypography>
    ),
    actions: (
      <ButtonGroup variant="outlined" aria-label="button group">
        <IconButton aria-label="delete" size="medium" onClick={() => handleDeleteForm(el._id)}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleEditForm(el._id, el.name)}
        >
          <EditIcon color="success" />
        </IconButton>
      </ButtonGroup>
    ),
    view: (
      <MDButton>
        <MDTypography
          component="a"
          fontWeight="bold"
          variant="caption"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate(`/vendor-category/${el._id}`)}
        >
          VIEW
        </MDTypography>
      </MDButton>
    ),
  }));

  const getCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/vendor-category/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setCategories(jsonData.vendorCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/delete-vendor-category/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      getCategories();
      setOpenDeleteForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteForm = (_id) => {
    setOpenDeleteForm(true);
    setCategoryId(_id);
  };

  const handleInsert = async () => {
    setCategoryName("");
    console.log("Category Name:", categoryName);
    try {
      const response = await fetch(`${BASE_URL}/admin/create-vendor-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryName: categoryName }), // Ensure category_name is included in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setCategoryName("");
      setOpenInsertForm(false);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (_id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/update-vendor-category/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ updatedCategoryName: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setOpenEditForm(false);
      setCategoryName("");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditForm = (_id, category_name) => {
    setOpenEditForm(true);
    setCategoryName(category_name);
    setCategoryId(_id);
  };

  useEffect(() => {
    getCategories();
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
                  Category Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    setOpenInsertForm(true);
                    setCategoryName("");
                  }}
                >
                  Insert
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* insert category */}
      <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)}>
        <DialogTitle>Insert Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
          <Button onClick={handleInsert} color="primary" disabled={!categoryName}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* edit category */}
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Update Vendor Category Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
          <Button onClick={() => handleUpdate(categoryId)} color="primary" disabled={!categoryName}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

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

export default VendorCategoryTable;
