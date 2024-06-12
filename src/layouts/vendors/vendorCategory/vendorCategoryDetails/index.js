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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useParams } from "react-router-dom";

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

function VendorCategoryDetailsTable() {
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [categoryProperties, setCategoryProperties] = useState([]);

  const [subcategoryName, setSubcategoryName] = useState("");
  const [openSubcategoryInsertForm, setOpenSubcategoryInsertForm] = useState(false);
  const [openSubcategoryDeleteForm, setOpenSubcategoryDeleteForm] = useState(false);
  const [openSubcategoryEditForm, setOpenSubcategoryEditForm] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState("");

  const [openPropertyInsertForm, setOpenPropertyInsertForm] = useState(false);
  const [openPropertyDeleteForm, setOpenPropertyDeleteForm] = useState(false);
  const [openPropertyEditForm, setOpenPropertyEditForm] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [propertyType, setPropertyType] = useState("textInput");
  const [propertyInputs, setPropertyInputs] = useState([]);

  const token = localStorage.getItem("token");

  // subcat rows-cols
  const subcat_columns = [
    { Header: "Name", accessor: "category_name", width: "40%" },
    { Header: "Created", accessor: "createdAt", width: "20%" },
    { Header: "Last Updated", accessor: "updatedAt", width: "20%" },
    { Header: "Actions", accessor: "actions", width: "20%" },
  ];
  const subcat_rows = subcategories.map((el) => ({
    category_name: <Author name={el.subCategoryName} email={el._id} />,
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
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleDeleteSubCategoryForm(el._id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton
          aria-label="edit"
          size="medium"
          onClick={() => handleEditSubCategoryForm(el._id, el.subCategoryName)}
        >
          <EditIcon color="success" />
        </IconButton>
      </ButtonGroup>
    ),
  }));

  // property rows-cols
  const cat_property_columns = [
    { Header: "Name", accessor: "category_name", width: "25%" },
    { Header: "Input Type", accessor: "input_type", width: "25%" },
    { Header: "Created", accessor: "createdAt", width: "25%" },
    { Header: "Last Updated", accessor: "updatedAt", width: "25%" },
    { Header: "Actions", accessor: "actions", width: "25%" },
  ];
  const cat_property_rows = categoryProperties.map((el) => ({
    category_name: <Author name={el.propertyName} email={el._id} />,
    input_type: <Author name={el.propertyType} />,
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
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleDeletePropertyForm(el._id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton aria-label="edit" size="medium" onClick={() => handlePropertyUpdateForm(el)}>
          <EditIcon color="success" />
        </IconButton>
      </ButtonGroup>
    ),
  }));

  const getCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/vendor-category/get-additional-details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setSubcategories(jsonData.vendorDetails.subCategoryList);
      setCategoryProperties(jsonData.vendorDetails.categoryProperties);
      setCategoryName(jsonData.vendorDetails.name);
    } catch (error) {
      console.log(error);
    }
  };

  // subcategory functions
  const handleInsertSubCategory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/add-vendor-subcategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subCategoryName: subcategoryName }), // Ensure category_name is included in the request body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setSubcategoryName("");
      setOpenSubcategoryInsertForm(false);
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubCategoryForm = (_id) => {
    setOpenSubcategoryDeleteForm(true);
    setSubcategoryId(_id);
  };

  const handleDeleteSubCategory = async (subcategoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/delete-vendor-subcategory/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subcategoryId: subcategoryId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      getCategory();
      setSubcategoryId("");
      setOpenSubcategoryDeleteForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubCategoryForm = (_id, subcategory_name) => {
    setOpenSubcategoryEditForm(true);
    setSubcategoryName(subcategory_name);
    setSubcategoryId(_id);
  };

  const handleUpdateSubCategory = async (subcategoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/update-vendor-subcategory/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subcategoryId: subcategoryId, subCategoryName: subcategoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setOpenSubcategoryEditForm(false);
      const jsonData = await response.json();
      console.log(jsonData);
      setSubcategoryName("");
      setSubcategoryId("");
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  // property functions
  const handlePropertyInsert = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/add-vendor-property/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyName,
          propertyDescription,
          propertyType,
          inputs: propertyInputs,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setPropertyName("");
      setPropertyDescription("");
      setPropertyType("textInput");
      setPropertyInputs([]);
      setOpenPropertyInsertForm(false);
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPropertyInput = () => {
    setPropertyInputs([...propertyInputs, ""]);
  };

  const handleRemovePropertyInput = (index) => {
    setPropertyInputs(propertyInputs.filter((_, i) => i !== index));
  };

  const handlePropertyInputChange = (index, value) => {
    const newInputs = propertyInputs.slice();
    newInputs[index] = value;
    setPropertyInputs(newInputs);
  };

  const handleDeletePropertyForm = (property_id) => {
    setOpenPropertyDeleteForm(true);
    setPropertyId(property_id);
  };

  const handleDeleteProperty = async (property_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/delete-vendor-property/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId: property_id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      getCategory();
      setPropertyId("");
      setOpenPropertyDeleteForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePropertyUpdateForm = (property) => {
    setPropertyId(property._id);
    setPropertyName(property.propertyName);
    setPropertyDescription(property.propertyDescription);
    setPropertyType(property.propertyType);
    setPropertyInputs(property.inputs);
    setOpenPropertyEditForm(true);
  };

  const handlePropertyUpdate = async (propertyId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/update-vendor-property/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: propertyId,
          propertyName: propertyName,
          propertyDescription: propertyDescription,
          propertyType: propertyType,
          inputs: propertyInputs,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setOpenSubcategoryEditForm(false);
      const jsonData = await response.json();
      console.log(jsonData);
      setPropertyId("");
      setPropertyName("");
      setPropertyDescription("");
      setPropertyType("");
      setPropertyInputs([]);
      setOpenPropertyEditForm(false);
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
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
                  {categoryName} SubCategory Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    setOpenSubcategoryInsertForm(true);
                    setSubcategoryName("");
                  }}
                >
                  Insert
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: subcat_columns, rows: subcat_rows }}
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
                  {categoryName} Property Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    setOpenPropertyInsertForm(true);
                    setPropertyName("");
                    setPropertyDescription("");
                    setPropertyType("textInput");
                    setPropertyInputs([]);
                  }}
                >
                  Insert
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: cat_property_columns, rows: cat_property_rows }}
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

      {/* subcategory insert */}
      <Dialog open={openSubcategoryInsertForm} onClose={() => setOpenSubcategoryInsertForm(false)}>
        <DialogTitle>Insert SubCategory</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="SubCategory Name"
            type="text"
            fullWidth
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            error={subcategoryName.trim() === ""}
            helperText={subcategoryName.trim() === "" ? "Subcategory Name cannot be empty" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubcategoryInsertForm(false)}>Cancel</Button>
          <Button
            onClick={handleInsertSubCategory}
            color="primary"
            disabled={subcategoryName.trim() === ""} // Disable button if the field is empty
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* subcategory delete */}
      <Dialog
        open={openSubcategoryDeleteForm}
        onClose={() => {
          setOpenSubcategoryDeleteForm(false);
          setSubcategoryId("");
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenSubcategoryDeleteForm(false);
              setSubcategoryId("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteSubCategory(subcategoryId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* subcategory edit */}
      <Dialog open={openSubcategoryEditForm} onClose={() => setOpenSubcategoryEditForm(false)}>
        <DialogTitle>Update Vendor SubCategory Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="SubCategory Name"
            type="text"
            fullWidth
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubcategoryEditForm(false)}>Cancel</Button>
          <Button
            onClick={() => handleUpdateSubCategory(subcategoryId)}
            color="primary"
            disabled={!subcategoryName} // Disable button if subcategoryName is empty
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* property insert */}
      <Dialog open={openPropertyInsertForm} onClose={() => setOpenPropertyInsertForm(false)}>
        <DialogTitle>Insert Property</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="propertyName"
            label="Property Name"
            type="text"
            fullWidth
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            id="propertyDescription"
            label="Property Description"
            type="text"
            fullWidth
            value={propertyDescription}
            onChange={(e) => setPropertyDescription(e.target.value)}
          />
          <RadioGroup
            aria-label="property type"
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <FormControlLabel value="textInput" control={<Radio />} label="Text Input" />
            <FormControlLabel value="radioButton" control={<Radio />} label="Radio Button" />
          </RadioGroup>
          {propertyType === "radioButton" && (
            <MDBox>
              {propertyInputs.map((input, index) => (
                <MDBox key={index} display="flex" alignItems="center">
                  <TextField
                    margin="normal"
                    label={`Input ${index + 1}`}
                    type="text"
                    fullWidth
                    value={input}
                    onChange={(e) => handlePropertyInputChange(index, e.target.value)}
                  />
                  <IconButton
                    aria-label="remove input"
                    onClick={() => handleRemovePropertyInput(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </MDBox>
              ))}
              <Button
                variant="contained"
                color="info"
                startIcon={<AddIcon />}
                onClick={handleAddPropertyInput}
              >
                Add Input
              </Button>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPropertyInsertForm(false)}>Cancel</Button>
          <Button
            onClick={handlePropertyInsert}
            color="primary"
            disabled={
              !propertyName ||
              !propertyDescription ||
              (propertyType === "radioButton" &&
                (propertyInputs.length < 2 || propertyInputs.some((input) => !input)))
            }
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* property update */}
      <Dialog open={openPropertyEditForm} onClose={() => setOpenPropertyEditForm(false)}>
        <DialogTitle>Update Property</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="propertyName"
            label="Property Name"
            type="text"
            fullWidth
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="normal"
            id="propertyDescription"
            label="Property Description"
            type="text"
            fullWidth
            value={propertyDescription}
            onChange={(e) => setPropertyDescription(e.target.value)}
          />
          <RadioGroup
            aria-label="property type"
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <FormControlLabel value="textInput" control={<Radio />} label="Text Input" />
            <FormControlLabel value="radioButton" control={<Radio />} label="Radio Button" />
          </RadioGroup>
          {propertyType === "radioButton" && (
            <MDBox>
              {propertyInputs.map((input, index) => (
                <MDBox key={index} display="flex" alignItems="center">
                  <TextField
                    margin="normal"
                    label={`Input ${index + 1}`}
                    type="text"
                    fullWidth
                    value={input}
                    onChange={(e) => handlePropertyInputChange(index, e.target.value)}
                  />
                  <IconButton
                    aria-label="remove input"
                    onClick={() => handleRemovePropertyInput(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </MDBox>
              ))}
              <Button
                variant="contained"
                color="info"
                startIcon={<AddIcon />}
                onClick={handleAddPropertyInput}
              >
                Add Input
              </Button>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPropertyEditForm(false)}>Cancel</Button>
          <Button
            onClick={() => handlePropertyUpdate(propertyId)}
            color="primary"
            disabled={
              !propertyName ||
              !propertyDescription ||
              (propertyType === "radioButton" &&
                (propertyInputs.length < 2 || propertyInputs.some((input) => !input)))
            }
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* property delete */}
      <Dialog
        open={openPropertyDeleteForm}
        onClose={() => {
          setOpenPropertyDeleteForm(false);
          setPropertyId("");
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenPropertyDeleteForm(false);
              setPropertyId("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleDeleteProperty(propertyId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default VendorCategoryDetailsTable;
