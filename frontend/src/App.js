import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Import views
import AdminLayout from "layouts/Admin.js";
import UserLayout from "layouts/User.js";
import LandingPage from "views/LandingPage.js";
import Login from "views/login.js";
import Register from "views/register.js";
import 'leaflet/dist/leaflet.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />

        {/* Login & Register */}
        <Route path="/login" render={() => <Login setUser={setUser} />} />
        <Route path="/register" component={Register} />

        {/* Admin tetap pakai guard */}
        <Route
          path="/admin"
          render={(props) =>
            user && user.role === 0 ? (
              <AdminLayout {...props} />
            ) : (
              <Redirect to={user ? "/user/dashboarduser" : "/login"} />
            )
          }
        />

        {/* User route tanpa guard */}
        <Route path="/user" component={UserLayout} />

        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
