// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";

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
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import SuccessSnackbar from "examples/Snackbar/SuccessSnackbar";

// Images
import bgImage from "assets/images/rajwada.jpg";

function Cover() {
  const [popup, setPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState(false);

  function handleClick() {
    if (phone === "") {
      setError(true);
      setText("Please enter your Mobile Number to Signup.");
    } else if (name === "") {
      setError(true);
      setText("Please enter your Name to Signup.");
    } else if (email === "") {
      setError(true);
      setText("Please enter your Email to Signup.");
    } else if (phone.length !== 10) {
      setError(true);
      setText("Mobile Number should be of 10 digits.");
    } else {
      setPopup(true);
      // Backend Send otp on phone and take data
    }
  }

  const handleSubmitOTP = (otp) => {
    console.log(`Submitted OTP: ${otp}`);
    setPopup(false);
    setSuccess(true);
    setText("Registration Successfull.");
    // Backend check OTP
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
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                <MDButton variant="gradient" color="info" fullWidth onClick={() => handleClick()}>
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
