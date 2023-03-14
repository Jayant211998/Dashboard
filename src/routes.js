import Dashboard from "layouts/dashboard";
import WaterSupply from "layouts/watersupply";
import Requests from "layouts/requests";
import Complaints from "layouts/complaints";
import Events from "layouts/events";
import Slider from "layouts/slider";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Request",
    key: "Requests",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/request",
    component: <Requests />,
  },
  {
    type: "collapse",
    name: "Water Supply",
    key: "watersupply",
    icon: <Icon fontSize="small">local_drink</Icon>,
    route: "/watersupply",
    component: <WaterSupply />,
  },
  {
    type: "collapse",
    name: "Complaints",
    key: "complaints",
    icon: <Icon fontSize="small">description</Icon>,
    route: "/complaints",
    component: <Complaints />,
  },
  {
    type: "collapse",
    name: "Events",
    key: "events",
    icon: <Icon fontSize="small">diversity_3</Icon>,
    route: "/events",
    component: <Events />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Slider",
    key: "Slider",
    icon: <Icon fontSize="small">image</Icon>,
    route: "/slider",
    component: <Slider />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
