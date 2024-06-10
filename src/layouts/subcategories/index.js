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
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const Author = ({ name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

function Tables() {
  const columns = [
    { Header: "SubCategory", accessor: "category_name", width: "20%" },
    { Header: "Category", accessor: "category", width: "20%" },
    { Header: "Created", accessor: "createdAt", width: "20%" },
    { Header: "Last Updated", accessor: "updatedAt", width: "20%" },
    { Header: "Actions", accessor: "actions", width: "20%" },
  ];

  const [openInsertForm, setOpenInsertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [subcategoryName, setSubCategoryName] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");

  const getCategoryName = (_id) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i]._id === _id) {
        console.log(categories[i]);
        return categories[i].category_name;
      }
    }
  };

  const rows = subcategories.map((el) => ({
    category_name: <Author name={el.subcategory_name} email={el._id} />,
    category: (
      <Author name={categories.length && getCategoryName(el.category_id)} email={el.category_id} />
    ),
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
          onClick={() => handleEditForm(el._id, el.subcategory_name, el.category_id)}
        >
          <EditIcon color="success" />
        </IconButton>
      </ButtonGroup>
    ),
  }));

  const getSubCategories = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        "https://chemical-api-usa2.onrender.com/api/subcategory/allsubcategories",
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
      setSubCategories(jsonData.subcategoriesWithCategories);
    } catch (error) {
      console.log(error);
    }
  };

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
      setCategory(jsonData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${_id}`,
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
      setOpenDeleteForm(false);
      getSubCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInsert = async () => {
    setSubCategoryName("");
    setCategoryId("");
    console.log("Category Name:", categoryName);
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subcategory_name: subcategoryName, category_id: categoryId }), // Ensure category_name is included in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setSubCategoryName("");
      setCategoryId("");
      setOpenInsertForm(false);
      getSubCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (_id) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subcategory_name: subcategoryName, category_id: categoryId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setOpenEditForm(false);
      setSubCategoryName("");
      setCategoryId("");
      getSubCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditForm = (_id, subcategory_name, category_id) => {
    setOpenEditForm(true);
    setCategoryId(category_id);
    setSubCategoryId(_id);
    setSubCategoryName(subcategory_name);
  };

  const handleDeleteForm = (_id) => {
    setOpenDeleteForm(true);
    setSubCategoryId(_id);
  };

  useEffect(() => {
    getSubCategories();
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
                  SubCategory Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    setOpenInsertForm(true);
                    setSubCategoryName("");
                    setCategoryId("");
                  }}
                >
                  Insert
                </Button>
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
                {subcategories.map((el) => (
                  <Card
                    key={el._id}
                    sx={{
                      bgcolor: "#ededed",
                      width: "fit-content",
                      maxWidth: "210px",
                      flexGrow: 1,
                    }}
                    variant="elevation"
                  >
                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <Typography variant="h3" component="div">
                        {el.subcategory_name}
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: "12px" }} color="text.secondary">
                        {el._id}
                      </Typography>
                      <Typography variant="h6" component="div">
                        category: {categories.length && getCategoryName(el.category_id)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <ButtonGroup variant="outlined" aria-label="button group" fullWidth>
                        <IconButton
                          aria-label="delete"
                          size="medium"
                          onClick={() => handleDeleteForm(el._id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="medium"
                          onClick={() =>
                            handleEditForm(el._id, el.subcategory_name, el.category_id)
                          }
                        >
                          <EditIcon color="success" />
                        </IconButton>
                      </ButtonGroup>
                    </CardActions>
                  </Card>
                ))}
              </Grid>
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
            label="SubCategory Name"
            type="text"
            fullWidth
            value={subcategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="select-category-label">Select Category</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              label="Select Category"
              sx={{ padding: "10px" }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
          <Button onClick={handleInsert} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="SubCategory Name"
            type="text"
            fullWidth
            value={subcategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="select-category-label">Select Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              label="Select Category"
              sx={{ padding: "10px" }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
          <Button onClick={() => handleUpdate(subcategoryId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteForm}
        onClose={() => {
          setOpenDeleteForm(false);
          setSubCategoryName("");
          setCategoryId("");
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteForm(false);
              setSubCategoryName("");
              setCategoryId("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleDelete(subcategoryId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox pt={6} pb={3}>
    //     <Grid container spacing={6}>
    //       <Grid item xs={12}>
    //         <Card>
    //           <MDBox
    //             mx={2}
    //             mt={-3}
    //             py={3}
    //             px={2}
    //             variant="gradient"
    //             bgColor="info"
    //             borderRadius="lg"
    //             coloredShadow="info"
    //             display="flex"
    //             justifyContent="space-between"
    //             alignItems="center"
    //           >
    //             <MDTypography variant="h6" color="white">
    //               SubCategory Table
    //             </MDTypography>
    //             <Button
    //               variant="contained"
    //               color="info"
    //               startIcon={<AddCircleOutlineIcon />}
    //               onClick={() => {
    //                 setOpenInsertForm(true);
    //                 setSubCategoryName("");
    //                 setCategoryId("");
    //               }}
    //             >
    //               Insert
    //             </Button>
    //           </MDBox>
    //           <MDBox pt={3}>
    //             <DataTable
    //               table={{ columns, rows }}
    //               isSorted={true}
    //               entriesPerPage={false}
    //               showTotalEntries={false}
    //               noEndBorder
    //             />
    //           </MDBox>
    //         </Card>
    //       </Grid>
    //     </Grid>
    //   </MDBox>
    //   <Footer />

    //   {/* Form Dialog */}
    //   <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)}>
    //     <DialogTitle>Insert Category</DialogTitle>
    //     <DialogContent>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="categoryName"
    //         label="SubCategory Name"
    //         type="text"
    //         fullWidth
    //         value={subcategoryName}
    //         onChange={(e) => setSubCategoryName(e.target.value)}
    //       />
    //       <FormControl fullWidth margin="dense">
    //         <InputLabel id="select-category-label">Select Category</InputLabel>
    //         <Select
    //           value={categoryId}
    //           onChange={(e) => setCategoryId(e.target.value)}
    //           label="Select Category"
    //           sx={{ padding: "10px" }}
    //         >
    //           {categories.map((category) => (
    //             <MenuItem key={category._id} value={category._id}>
    //               {category.category_name}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
    //       <Button onClick={handleInsert} color="primary">
    //         Ok
    //       </Button>
    //     </DialogActions>
    //   </Dialog>

    //   <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
    //     <DialogTitle>Insert Category</DialogTitle>
    //     <DialogContent>
    //       <TextField
    //         autoFocus
    //         margin="dense"
    //         id="categoryName"
    //         label="SubCategory Name"
    //         type="text"
    //         fullWidth
    //         value={subcategoryName}
    //         onChange={(e) => setSubCategoryName(e.target.value)}
    //       />
    //       <FormControl fullWidth margin="dense">
    //         <InputLabel id="select-category-label">Select Category</InputLabel>
    //         <Select
    //           labelId="select-category-label"
    //           id="select-category"
    //           value={categoryId}
    //           onChange={(e) => setCategoryId(e.target.value)}
    //           label="Select Category"
    //           sx={{ padding: "10px" }}
    //         >
    //           {categories.map((category) => (
    //             <MenuItem key={category._id} value={category._id}>
    //               {category.category_name}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
    //       <Button onClick={() => handleUpdate(subcategoryId)} color="primary">
    //         Ok
    //       </Button>
    //     </DialogActions>
    //   </Dialog>

    //   <Dialog
    //     open={openDeleteForm}
    //     onClose={() => {
    //       setOpenDeleteForm(false);
    //       setSubCategoryName("");
    //       setCategoryId("");
    //     }}
    //   >
    //     <DialogTitle>Confirm Delete</DialogTitle>
    //     <DialogActions>
    //       <Button
    //         onClick={() => {
    //           setOpenDeleteForm(false);
    //           setSubCategoryName("");
    //           setCategoryId("");
    //         }}
    //       >
    //         Cancel
    //       </Button>
    //       <Button onClick={() => handleDelete(subcategoryId)} color="primary">
    //         Ok
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </DashboardLayout>
  );
}

export default Tables;
