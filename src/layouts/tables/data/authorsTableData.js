/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";

export default function data() {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getCategories();
  }, []);

  return {
    columns: [
      { Header: "Name", accessor: "category_name", width: "25%" },
      { Header: "Created", accessor: "createdAt", width: "25%" },
      { Header: "Last Updated", accessor: "updatedAt", width: "25%" },
      { Header: "Actions", accessor: "actions", width: "25%" },
    ],
    rows: categories.map((el) => ({
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
          <IconButton aria-label="delete" size="medium">
            <EditIcon color="success" />
          </IconButton>
        </ButtonGroup>
      ),
    })),
  };
}
