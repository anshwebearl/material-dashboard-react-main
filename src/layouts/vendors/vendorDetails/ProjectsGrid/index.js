/* eslint-disable react/prop-types */
import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_PROD;

const BASE_IMG_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_IMAGE_BASE_URL_DEV
    : process.env.REACT_APP_IMAGE_BASE_URL_PROD;

const Projects = ({ vendor_id }) => {
  const [itemData, setItemData] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const getProjectItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/vendor/get-projects/${vendor_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setItemData(jsonData.project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectItems();
  }, []);

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const handleModalClose = () => {
    setModalImage(null);
  };

  return (
    <div>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData?.photos?.map((item) => (
          <ImageListItem key={item} onClick={() => handleImageClick(item)}>
            <img src={`${BASE_IMG_URL}/${item}`} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      {modalImage && (
        <div className="modal" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={`${BASE_IMG_URL}/${modalImage}`} alt="Selected" />
          </div>
        </div>
      )}
      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          max-width: 100%;
          max-height: 100%;
          background: white;
          border-radius: 8px;
        }
        .modal-content img {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Projects;
