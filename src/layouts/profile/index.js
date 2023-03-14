// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import burceMars from "assets/images/bruce-mars.jpg";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={5} mb={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={10}>
            <Grid item xs={12} md={6} xl={10} sx={{ display: "flex" }}>
              <Grid item>
                <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
              </Grid>
              <Grid item style={{ marginLeft: "1rem" }}>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="medium">
                    Richard Davis
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    CEO / Co-Founder
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
            <Divider orientation="hors" sx={{ ml: -2, mr: 1 }} />
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
