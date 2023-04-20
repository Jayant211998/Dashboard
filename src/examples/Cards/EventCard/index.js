// react-router components
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import "./MyComponent.css";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

export default function EventCard({ image, data, handleClick }) {
  return (
    <Card
      className="card"
      onClick={() => {
        handleClick(data, image);
      }}
    >
      <MDBox
        component="img"
        src={`data:image/png;base64,${image}`}
        alt={data.eventName}
        borderRadius="lg"
        shadow="md"
        width="100%"
        height="100%"
      />
      <MDBox p={3}>
        <MDTypography display="inline" variant="h4" textTransform="capitalize" fontWeight="bold">
          {data.eventName}
        </MDTypography>
        <MDBox mt={2} mb={3}>
          <MDTypography variant="body2" component="p" color="text">
            {data.venue}
          </MDTypography>
          <MDTypography variant="body2" component="p" color="text">
            {data.startDate}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
EventCard.propTypes = {
  image: PropTypes.string.isRequired,
  data: PropTypes.shape({
    venue: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
