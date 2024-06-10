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

import MDAvatar from "components/MDAvatar";

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

function VendorCategoryTable() {
  const columns = [
    { Header: "Name", accessor: "category_name", width: "25%" },
    { Header: "Created", accessor: "createdAt", width: "25%" },
    { Header: "Last Updated", accessor: "updatedAt", width: "25%" },
    { Header: "Actions", accessor: "actions", width: "25%" },
  ];

  const [openInsertForm, setOpenInsertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const rows = categories.map((el) => ({
    category_name: <Author name={el.category_name} email={el._id} />,
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
        <IconButton aria-label="delete" size="medium" onClick={() => handleDelete(el._id)}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleEditForm(el._id, el.category_name)}
        >
          <EditIcon color="success" />
        </IconButton>
      </ButtonGroup>
    ),
  }));

  const getCategories = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        "https://chemical-api-usa2.onrender.com/api/category/categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setCategories(jsonData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/category/categories/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInsert = async () => {
    setCategoryName("");
    console.log("Category Name:", categoryName);
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/category/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ category_name: categoryName }), // Ensure category_name is included in the request body
        }
      );

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
    console.log("Category Name:", categoryName);
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/category/categories/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ category_name: categoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
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
                  onClick={() => setOpenInsertForm(true)}
                >
                  Insert
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Form Dialog */}
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
          <Button onClick={handleInsert} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>update Category</DialogTitle>
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
          <Button onClick={() => handleUpdate(categoryId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default VendorCategoryTable;
