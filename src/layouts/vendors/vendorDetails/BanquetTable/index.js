/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import { Typography } from "@mui/material";

const CustomHeader = ({ vendor_id }) => {
  const token = localStorage.getItem("token");

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_BASE_URL_DEV
      : process.env.REACT_APP_API_BASE_URL_PROD;

  const IMG_BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_IMAGE_BASE_URL_DEV
      : process.env.REACT_APP_IMAGE_BASE_URL_PROD;

  const [banquet, setBanquet] = useState([]);

  const columns = [
    { Header: "Title", accessor: "banquet_title", width: "10%" },
    { Header: "Type", accessor: "banquet_type", width: "10%" },
    { Header: "Fixed Capacity", accessor: "fixed_capacity" },
    { Header: "Max Capacity", accessor: "max_capacity" },
    { Header: "State", accessor: "state" },
    { Header: "City", accessor: "city" },
    { Header: "Cover Photo", accessor: "cover_photo" },
    { Header: "Additional Photos", accessor: "additional_photos" },
  ];

  const rows = banquet?.map((item) => ({
    banquet_title: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.title}
      </MDTypography>
    ),
    banquet_type: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.banquet_type}
      </MDTypography>
    ),
    fixed_capacity: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.fixed_capacity}
      </MDTypography>
    ),
    max_capacity: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.max_capacity}
      </MDTypography>
    ),
    state: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.state}
      </MDTypography>
    ),
    city: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.city}
      </MDTypography>
    ),
    cover_photo: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        <a
          target="_blank"
          href={`${IMG_BASE_URL}/${item.cover_photo.split("/\\").join("/")}`}
          rel="noreferrer"
        >
          cover_photo
        </a>
      </MDTypography>
    ),
    additional_photos: (
      <MDTypography component="a" variant="button" color="text" fontWeight="medium">
        {item.additional_photos.map((el, idx) => (
          <a target="_blank" key={idx} href={`${IMG_BASE_URL}/${el}`} rel="noreferrer">
            photo {idx + 1} <br />
          </a>
        ))}
      </MDTypography>
    ),
  }));

  const getAllBanquetItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/get-banquet/${vendor_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setBanquet(jsonData.banquets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBanquetItems();
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
