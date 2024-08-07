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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import SubCategory from "layouts/subcategories";
import Vendors from "layouts/vendors";
import Users from "layouts/users";
import ResetPassword from "layouts/authentication/reset-password/cover";
import VendorDetails from "layouts/vendors/vendorDetails";
import VendorCategoryTable from "layouts/vendors/vendorCategory";
import VendorCategoryDetailsTable from "layouts/vendors/vendorCategory/vendorCategoryDetails";
import CategoryIcon from "@mui/icons-material/Category";
import MembershipPlansTable from "layouts/membership-plans";
import AddMembershipPlan from "layouts/membership-plans/add-plan";
import EditMembershipPlan from "layouts/membership-plans/edit-plan";
import ViewMembershipPlan from "layouts/membership-plans/view-plan";

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
    name: "Vendors",
    key: "vendors",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/vendors",
    component: <Vendors />,
  },
  {
    type: "collapse",
    name: "Vendor Category",
    key: "vendor-category",
    icon: <CategoryIcon />,
    route: "/vendor-category",
    component: <VendorCategoryTable />,
  },
  {
    type: "route",
    name: "Vendor Category Details",
    key: "vendor-category",
    icon: <CategoryIcon />,
    route: "/vendor-category/:id",
    component: <VendorCategoryDetailsTable />,
  },
  {
    type: "collapse",
    name: "Membersip Plans",
    key: "membership-plans",
    icon: <Icon fontSize="small">supervisor_account</Icon>,
    route: "/membership-plans",
    component: <MembershipPlansTable />,
  },
  {
    type: "route",
    name: "Add Membersip Plans",
    key: "add-membership-plans",
    icon: <Icon fontSize="small">supervisor_account</Icon>,
    route: "/membership-plans/add-plan",
    component: <AddMembershipPlan />,
  },
  {
    type: "route",
    name: "Edit Membersip Plans",
    key: "edit-membership-plans",
    icon: <Icon fontSize="small">supervisor_account</Icon>,
    route: "/membership-plans/edit-plan/:id",
    component: <EditMembershipPlan />,
  },
  {
    type: "route",
    name: "View Membersip Plans",
    key: "view-membership-plans",
    icon: <Icon fontSize="small">supervisor_account</Icon>,
    route: "/membership-plans/view-plan/:id",
    component: <ViewMembershipPlan />,
  },
  // {
  //   type: "collapse",
  //   name: "SubCategory",
  //   key: "subcategory",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/subcategory",
  //   component: <SubCategory />,
  // },
  // {
  //   type: "collapse",
  //   name: "Users",
  //   key: "users",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/users",
  //   component: <Users />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Forget Password",
    key: "reset-password",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/reset-password",
    component: <ResetPassword />,
  },
  {
    type: "route",
    name: "Vendor Details",
    key: "vendor-details",
    route: "/vendors/:id",
    component: <VendorDetails />,
  },
];

export default routes;
