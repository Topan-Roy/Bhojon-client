import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Authentication/Register/Register";
import Login from "../Authentication/Login/Login";




import ManuMAnu from "../Pages/Manu/ManuMAnu";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ReservationRes from "../Pages/Reservation/ReservationRes";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Team from "../Pages/Team/Team";
import Gallery from "../Pages/Gallery/Gallery";
import NotFoundPage from "../Shared/NotFoundPage";
import OnlineOrder from "../Pages/OnlineOrder/OnlineOrder";
import CheckoutPage from "../Pages/OnlineOrder/CheckoutPage/CheckoutPage";
import AdminDashboard from "../Layout/AdminDashboard";
import Dashboard from "../Pages/ADashboard/Dashboard/Dashboard";
import ManageOrder from "../Pages/ADashboard/ManageOrder/ManageOrder";
import CompletedBookings from "../Pages/ADashboard/CompletedBookings/CompletedBookings";
import PendingBookings from "../Pages/ADashboard/PendingBookings/PendingBookings";
import RejectedBookings from "../Pages/ADashboard/RejectedBookings/RejectedBookings";
import AddFoodForm from "../Pages/ADashboard/FoodManagement/AddFoodForm/AddFoodForm";
import AdminFoodList from "../Pages/ADashboard/FoodManagement/AdminFoodList/AdminFoodList";
import AddCategoryForm from "../Pages/ADashboard/FoodManagement/AddCategoryForm/AddCategoryForm";
import CategoryList from "../Pages/ADashboard/FoodManagement/CategoryList/CategoryList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'aboutus',
          Component:AboutUs
        },
        {
        path: 'reservation',
        Component: ReservationRes
      },
        {
        path:'manu',
        Component: ManuMAnu
      },
        {
        path:'contactus',
        Component: ContactUs
      },
        {
        path:'team',
        Component: Team
      },
        {
        path:'gallery',
        Component: Gallery
      },
        {
        path:'onlineorder',
        Component: OnlineOrder
      },
        {
        path:'checkoutpage',
        Component: CheckoutPage
      },

    ]
  },
   {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      

    ]
  },
   {
    path: '/dashboard',
    Component: AdminDashboard,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard
      },
      {
        path:'manageorder',
        Component: ManageOrder
      },
      {
        path:'completedbookings',
        Component: CompletedBookings
      },
      {
        path:'pendingbookings',
        Component: PendingBookings
      },
      {
        path:'rejectedbookings',
        Component: RejectedBookings
      },
      {
        path:'addfoodform',
        Component: AddFoodForm
      },
      {
        path:'adminfoodlist',
        Component:AdminFoodList
      },
      {
        path:'addcategoryform',
        Component:AddCategoryForm
      },
      {
        path:'categorylist',
        Component:CategoryList
      },
      
      

    ]
  },
   {
     path: "/*",
    Component:NotFoundPage
  }
]);
