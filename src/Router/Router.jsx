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
import ManageUsers from "../Pages/ADashboard/Users/ManageUsers/ManageUsers";
import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "../Routes/AdminRoute";
import PurchaseForm from "../Pages/ADashboard/PurchaseManage/PurchaseForm/PurchaseForm";
import ItemPurchase from "../Pages/ADashboard/PurchaseManage/ItemPurchase/ItemPurchase";
import PurchaseReturnList from "../Pages/ADashboard/PurchaseManage/PurchaseReturnList/PurchaseReturnList";

import ReservationForm from "../Pages/ADashboard/Reservation/ReservationForm";
import ReservationTable from "../Pages/ADashboard/Reservation/ReservationTable";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'aboutus',
        Component: AboutUs
      },
      {
        path: 'reservation',
        Component: ReservationRes
      },
      {
        path: 'manu',
        Component: ManuMAnu
      },
      {
        path: 'contactus',
        Component: ContactUs
      },
      {
        path: 'team',
        Component: Team
      },
      {
        path: 'gallery',
        Component: Gallery
      },
      {
        path: 'onlineorder',
        Component: OnlineOrder
      },
      {
        path: 'checkoutpage',
        element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
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
    element: <PrivateRoute><AdminRoute allowedRoles={["admin","order-manager","food-manager","Purchase-manager"]}> <AdminDashboard ></AdminDashboard></AdminRoute></PrivateRoute>,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard
      },
      {
        path: 'manageorder',
        element: <AdminRoute allowedRoles={["admin", "order-manager"]}><ManageOrder></ManageOrder></AdminRoute>
      },
      {
        path: 'completedbookings',
        element: <AdminRoute allowedRoles={["admin", "order-manager"]}><CompletedBookings></CompletedBookings></AdminRoute>
      },
      {
        path: 'pendingbookings',
        element: <AdminRoute allowedRoles={["admin", "order-manager"]}><PendingBookings></PendingBookings></AdminRoute>
      },
      {
        path: 'rejectedbookings',
        element: <AdminRoute allowedRoles={["admin", "order-manager"]}><RejectedBookings></RejectedBookings></AdminRoute>
      },
      {
        path: 'addfoodform',
        element: <AdminRoute allowedRoles={["admin", "food-manager"]}><AddFoodForm></AddFoodForm></AdminRoute>
      },
      {
        path: 'adminfoodlist',
        element: <AdminRoute allowedRoles={["admin", "food-manager"]}><AdminFoodList></AdminFoodList></AdminRoute>
      },
      {
        path: 'addcategoryform',
        element: <AdminRoute allowedRoles={["admin", "food-manager"]}><AddCategoryForm></AddCategoryForm></AdminRoute>
      },
      {
        path: 'categorylist',
        element: <AdminRoute allowedRoles={["admin", "food-manager"]}><CategoryList></CategoryList></AdminRoute>
      },
      {
        path: 'manageusers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'purchaseform',
        element: <AdminRoute allowedRoles={["admin", "Purchase-manager"]}><PurchaseForm></PurchaseForm></AdminRoute>
      },
      {
        path: 'itempurchase',
        element: <AdminRoute allowedRoles={["admin", "Purchase-manager"]}><ItemPurchase></ItemPurchase></AdminRoute>
      },
      {
        path: 'purchasereturnlist',
        element: <AdminRoute allowedRoles={["admin", "Purchase-manager"]}><PurchaseReturnList></PurchaseReturnList></AdminRoute>
      },
      {
        path: 'reservation',
        element: <AdminRoute allowedRoles={["admin"]}><ReservationForm></ReservationForm></AdminRoute>
      },
      {
        path: 'reservationtable',
        element: <AdminRoute allowedRoles={["admin"]}><ReservationTable></ReservationTable></AdminRoute>
      },


    ]
  },
  {
    path: "/*",
    Component: NotFoundPage
  }
]);
