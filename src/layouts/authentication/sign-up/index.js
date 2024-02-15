// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// @mui material components
import { Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import SignupPopup from "examples/Popup/SignupPopup";
import SuccessSnackbar from "examples/Snackbar/SuccessSnackbar";
import traceAndThrow from "utils/Errors";
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";

// Images
import bgImage from "assets/images/rajwada.jpeg";

function Cover() {
  const [popup, setPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [design, setdesign] = useState("");
  const [depart, setdepart] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState(false);

  async function handleClick(event) {
    event.preventDefault();
    if (phone === "") {
      setError(true);
      setText("Please enter your Mobile Number to Signup.");
    } else if (name === "") {
      setError(true);
      setText("Please enter your Name to Signup.");
    } else if (design === "") {
      setError(true);
      setText("Please enter your Email to Signup.");
    } else if (depart === "") {
      setError(true);
      setText("Please enter your Email to Signup.");
    } else if (phone.length !== 10) {
      setError(true);
      setText("Mobile Number should be of 10 digits.");
    } else {
      // Backend Send otp on phone and take data
      try {
        const response = await axios.post(
          "https://api.rausmartcity.com/signup-admin/JDWedjsew94513ndjsd-ssg/secure",
          {
            adminSignup: {
              adminName: name,
              phoneNumber: phone,
              designation: design,
              department: depart,
              role: "Admin",
            },
          }
        );
        setPopup(true);
        Cookies.set("sessionId", response.data.body.sessionId);
        Cookies.set("token", response.data.body.token);
      } catch (err) {
        setError(true);
        setText(traceAndThrow(err));
      }
    }
  }

  const handleSubmitOTP = async (otp) => {
    // Backend check OTP
    try {
      // Backend Send otp on phone and take data
      const response = await axios.post(
        "https://api.rausmartcity.com/confirm-admin/JDWedjsew94513ndjsd-ssg/secure",
        {
          adminConfirm: {
            sessionId: Cookies.get("sessionId"),
            confirmCode: otp,
            role: "Admin",
            type: "signup",
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
        setSuccess(true);
        setText("Registration Successfull.");
      }
    } catch (err) {
      if (err.response.status === 400 && err.response.data.errors[0].body.message) {
        setError(true);
        setText(traceAndThrow(err));
      } else if (err.response.status === 400 && err.response.data.errors[0].body.Details) {
        setError(true);
        setText(traceAndThrow(err));
      }
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
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and Phone Number to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Designation"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setdesign(e.target.value)}
                  value={design}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Department"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setdepart(e.target.value)}
                  value={depart}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Phone Number"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={(e) => handleClick(e)}>
                  Register
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
      {popup && (
        <SignupPopup
          handleClose={() => setPopup(false)}
          handleSubmitOTP={handleSubmitOTP}
          requestData={phone}
        />
      )}
      {error && (
        <ErrorSnackbar
          text={text}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
      {success && (
        <SuccessSnackbar
          text={text}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
}

export default Cover;
