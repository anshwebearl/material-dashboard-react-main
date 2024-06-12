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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate();

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_BASE_URL_DEV
      : process.env.REACT_APP_API_BASE_URL_PROD;

  const token = document.cookie.valueOf("token").split("=")[1];

  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpVerified, setOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleOtpChange = (element, index) => {
    const value = element.value;

    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];

    setOtp(newOtp);

    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (element, index, event) => {
    setOtpError("");
    if (event.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    const parsedOtp = Number(otp.join(""));
    if (parsedOtp === 123456) {
      setOtpVerified(true);
    } else {
      setOtpError("Incorrect OTP");
      setOtpVerified(false);
    }
  };

  const handleNewPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords dont match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/admin/changepassword/6661984aeb54b4acdb7d4691`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: "123456",
          new_password: newPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        setPasswordError("");
        navigate("/authentication/sign-in");
      } else {
        setPasswordError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/getAdmin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      {!otpVerified ? (
        otpSent ? (
          // otp
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              py={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                Enter OTP
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Please enter the 6-digit OTP sent to your email
              </MDTypography>
            </MDBox>
            {otpError.length !== 0 && (
              <MDBox pt={4} px={3}>
                <Alert variant="outlined" severity="error">
                  {otpError}
                </Alert>
              </MDBox>
            )}
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox display="flex" justifyContent="center" mb={4} gap={2}>
                  {otp.map((data, index) => (
                    <MDInput
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                      variant="standard"
                      inputProps={{ style: { textAlign: "center" } }}
                      autoFocus={index === 0}
                    />
                  ))}
                </MDBox>
                <MDBox mt={6} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={handleOtpSubmit}>
                    Submit OTP
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        ) : (
          // email
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              py={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
                Reset Password
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                You will receive an e-mail in maximum 60 seconds
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={4}>
                  <MDInput type="email" label="Email" variant="standard" fullWidth />
                </MDBox>
                <MDBox mt={6} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={() => setOtpSent(true)}
                  >
                    reset
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        )
      ) : (
        // change password
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Forgot Password
            </MDTypography>
          </MDBox>
          {passwordError.length !== 0 && (
            <MDBox pt={4} px={3}>
              <Alert variant="outlined" severity="error">
                {passwordError}
              </Alert>
            </MDBox>
          )}
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  type="password"
                  label="New Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  type="password"
                  label="Confirm New Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton onClick={handleNewPassword} variant="gradient" color="info" fullWidth>
                  Reset Password
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      )}
    </CoverLayout>
  );
}

export default Cover;
