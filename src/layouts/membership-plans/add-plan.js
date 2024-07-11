/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MuiAlert from "@mui/material/Alert";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_PROD;

const token = localStorage.getItem("token");

function AddMembershipPlan() {
  const [membershipCategory, setMembershipCategory] = useState("");
  const [price, setPrice] = useState("");
  const [planDays, setPlanDays] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  const handleAddFeature = () => {
    if (featureInput) {
      if (editingFeatureIndex !== null) {
        const updatedFeatures = [...features];
        updatedFeatures[editingFeatureIndex] = featureInput;
        setFeatures(updatedFeatures);
        setEditingFeatureIndex(null);
      } else {
        setFeatures([...features, featureInput]);
      }
      setFeatureInput("");
    }
  };

  const handleEditFeature = (index) => {
    setFeatureInput(features[index]);
    setEditingFeatureIndex(index);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!membershipCategory.trim()) {
      setSnackbarMessage("Category name is required.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!price.trim()) {
      setSnackbarMessage("Price is required.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!planDays.trim()) {
      setSnackbarMessage("Plan Days is required.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (features.length < 2) {
      setSnackbarMessage("At least two features are required.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const membershipPlan = {
      membership_category: membershipCategory,
      price: Number(price),
      plan_days: Number(planDays),
      features,
    };

    try {
      const response = await fetch(`${BASE_URL}/admin/add-membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(membershipPlan),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      if (jsonData.success) {
        setSnackbarMessage("Membership added successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate(-1);
        }, [1500]);
      }
    } catch (error) {
      setSnackbarMessage("Failed to add membership.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.log(error);
    }
  };

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
                  Add Membership Plans
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox mb={2}>
                      <label htmlFor="">Category</label>
                      <MDInput
                        type="text"
                        onInput={(e) => {
                          let value = e.target.value.replace(/[^ a-zA-Z]/g, "");
                          if (value.length > 0 && value[0] === " ") {
                            value = value.slice(1);
                          }
                          e.target.value = value;
                        }}
                        name="category"
                        value={membershipCategory}
                        onChange={(e) => setMembershipCategory(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Price</label>
                      <MDInput
                        type="text"
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <label htmlFor="">Plan Days</label>
                      <MDInput
                        type="text"
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                        name="planDays"
                        value={planDays}
                        onChange={(e) => setPlanDays(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <TextField
                        label="Feature"
                        variant="outlined"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDButton
                        variant="outlined"
                        color="info"
                        fullWidth
                        onClick={handleAddFeature}
                      >
                        {editingFeatureIndex !== null ? "Update Feature" : "Add Feature"}
                      </MDButton>
                    </MDBox>

                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} md={6} xl={6} px={2}>
                    <MDBox>
                      <label>Features</label>
                      <List>
                        {features.map((feature, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={feature} color="secondary" />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" onClick={() => handleEditFeature(index)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end" onClick={() => handleRemoveFeature(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
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
    </DashboardLayout>
  );
}

export default AddMembershipPlan;
