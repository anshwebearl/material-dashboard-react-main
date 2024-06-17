/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import { Typography } from "@mui/material";

const CustomHeader = ({ vendor_id }) => {
  const token = localStorage.getItem("token");

  const [menu, setMenu] = useState([]);

  const columns = [
    { Header: "Title", accessor: "menu_title", width: "10%" },
    { Header: "Type", accessor: "menu_type", width: "10%" },
    { Header: "Price/Plate", accessor: "price_per_plate" },
    { Header: "Veg Starters", accessor: "veg_starters" },
    { Header: "Veg Main Course", accessor: "veg_main_course" },
    { Header: "Veg Soup / Salad", accessor: "veg_soup_salad" },
    { Header: "Deserts", accessor: "deserts" },
    { Header: "Non Veg Starters", accessor: "nonveg_starters" },
    { Header: "Non Veg Main Course", accessor: "nonveg_main_course" },
    { Header: "Veg Soup / Salad", accessor: "nonveg_soup_salad" },
    { Header: "Live Counters", accessor: "live_counters" },
  ];

  const rows = menu?.map((item) => ({
    menu_title: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.menu_title}
      </MDTypography>
    ),
    menu_type: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.menu_type}
      </MDTypography>
    ),
    price_per_plate: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.price_per_plate}
      </MDTypography>
    ),
    veg_starters: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.veg_starters}
      </MDTypography>
    ),
    veg_main_course: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.veg_main_course}
      </MDTypography>
    ),
    veg_main_course: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.veg_main_course}
      </MDTypography>
    ),
    veg_soup_salad: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.veg_soup_salad}
      </MDTypography>
    ),
    deserts: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.deserts}
      </MDTypography>
    ),
    nonveg_starters: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.nonveg_starters || "-"}
      </MDTypography>
    ),
    nonveg_main_course: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.nonveg_main_course || "-"}
      </MDTypography>
    ),
    nonveg_soup_salad: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.nonveg_soup_salad || "-"}
      </MDTypography>
    ),
    live_counters: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.live_counters || "-"}
      </MDTypography>
    ),
  }));

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_BASE_URL_DEV
      : process.env.REACT_APP_API_BASE_URL_PROD;

  const getAllMenuItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/get-menu/${vendor_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setMenu(jsonData.menu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMenuItems();
  }, []);

  return (
    <DataTable
      table={{ columns, rows }}
      isSorted={true}
      entriesPerPage={false}
      showTotalEntries={false}
      noEndBorder
    />
  );
};

export default CustomHeader;
