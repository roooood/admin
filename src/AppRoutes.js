import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "./app/shared/Spinner";

const Dashboard = lazy(() => import("route/dashboard/dashboard"));
const Register = lazy(() => import("route/register/register"));


const Buttons = lazy(() => import("./app/basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./app/basic-ui/Dropdowns"));
const Typography = lazy(() => import("./app/basic-ui/Typography"));

const BasicElements = lazy(() => import("./app/form-elements/BasicElements"));

const BasicTable = lazy(() => import("./app/tables/BasicTable"));

const Mdi = lazy(() => import("./app/icons/Mdi"));

const ChartJs = lazy(() => import("./app/charts/ChartJs"));

const Error404 = lazy(() => import("./app/error-pages/Error404"));
const Error500 = lazy(() => import("./app/error-pages/Error500"));

const Login = lazy(() => import("./app/user-pages/Login"));
const Lockscreen = lazy(() => import("./app/user-pages/Lockscreen"));

const BlankPage = lazy(() => import("./app/general-pages/BlankPage"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />

          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />

          <Route
            path="/form-Elements/basic-elements"
            component={BasicElements}
          />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />

          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/lockscreen" component={Lockscreen} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Route path="/general-pages/blank-page" component={BlankPage} />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
