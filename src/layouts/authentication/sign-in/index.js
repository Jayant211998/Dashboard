// react-router-dom components
import { useState } from "react";

// @mui material components
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import traceAndThrow from "utils/Errors";
import SigninPopup from "examples/Popup/SigninPopup";

// Images
import bgImage from "assets/images/rajwada.jpeg";

function Basic() {
  const [error, setError] = useState(false);
  const [errText, setErrText] = useState(false);
  const [popup, setPopup] = useState(false);
  const [phone, setPhone] = useState("");

  async function handleClick() {
    if (phone === "") {
      setError(true);
      setErrText("Please enter your Registered mobile number to login.");
    } else if (phone.length !== 10) {
      setError(true);
      setErrText("Mobile Number should be of 10 digits.");
    } else {
      try {
        const response = await axios.post(
          "https://api.rausmartcity.com/login-admin/JDWedjsew94513ndjsd-ssg/secure",
          {
            adminLogin: {
              phoneNumber: phone,
              role: "Admin",
            },
          }
        );
        setPopup(true);
        Cookies.set("sessionId", response.data.body.sessionId);
        Cookies.set("token", response.data.body.token);
      } catch (err) {
        setError(true);
        setErrText(traceAndThrow(err));
      }
    }
  }

  const handleSubmitOTP = async (otp) => {
    try {
      // Backend Send otp on phone and take data
      const response = await axios.post(
        "https://api.rausmartcity.com/confirm-admin/JDWedjsew94513ndjsd-ssg/secure",
        {
          adminConfirm: {
            sessionId: Cookies.get("sessionId"),
            confirmCode: otp,
            role: "Admin",
            type: "login",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        Cookies.set("token", response.data.body.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(true);
      setErrText(traceAndThrow(err));
    }
    setPopup(false);
  };
  return (
    <>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Phone Number"
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={() => handleClick()}>
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
      {popup && (
        <SigninPopup
          handleClose={() => setPopup(false)}
          handleSubmitOTP={handleSubmitOTP}
          requestData={phone}
        />
      )}
      {error && (
        <ErrorSnackbar
          text={errText}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
}

export default Basic;
