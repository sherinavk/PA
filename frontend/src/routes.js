import Dashboard from "views/Dashboard.js";
import DashboardUser from "views/DashboardUser.js";
import UserProfile from "views/UserProfile.js";
import DaftarJalan from "views/DaftarJalan.js";
import DaftarJalanUser from "views/DaftarJalanUser.js";
import TambahJalan from "views/TambahJalan.js";
import UpdateJalan from "views/UpdateJalan.js";
import LandingPage from "views/LandingPage.js";
import Login from "views/login.js";
import Register from "views/register.js";
import Maps from "views/Maps.js";
import MapsUser from "views/MapsUser.js";

// Routes for the Admin dashboard section
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Daftar Jalan",
    icon: "nc-icon nc-notes",
    component: DaftarJalan,
    layout: "/admin"
  },
  {
    path: "/jalan/tambah",  // Route for adding road
    name: "Tambah Jalan",
    icon: "nc-icon nc-paper-2",
    component: TambahJalan,
    layout: "/admin"
  },
  {
    path: "/jalan/update/:id",  // Route for updating road with parameter ID
    name: "Update Jalan",
    icon: "nc-icon nc-paper-2",
    component: UpdateJalan,
    layout: "/admin"
  },
  {
    path: "/maps", // Menggunakan :id jika Anda ingin menampilkan ID dinamis
    component: Maps,
    layout: "/admin" // Atau sesuaikan dengan layout yang sesuai
  }
];


const dashboardRoutesUser = [
  {
    path: "/dashboarduser",
    name: "Dashboard User",
    icon: "nc-icon nc-chart-pie-35",
    component: DashboardUser,
    layout: "/user"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/user"
  },
  {
    path: "/table",
    name: "Daftar Jalan",
    icon: "nc-icon nc-notes",
    component: DaftarJalanUser,
    layout: "/user"
  },
  {
    path: "/maps",
    component: Maps,
    layout: "/user" // Atau sesuaikan dengan layout yang sesuai
  }
];

// Routes for authentication-related pages
const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: ""
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: ""
  }
];

const publicRoutes = [
  {
    path: "/home",
    name: "Landing Page",
    component: LandingPage, 
    layout: ""
  },
];

export { dashboardRoutes, authRoutes, publicRoutes, dashboardRoutesUser};