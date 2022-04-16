import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Dashboards = ({ match }) => {
  return(
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/Banners/Banner`} component={lazy(() => import(`../apps/Banners/Banner`))} />
      <Route path={`${match.url}/analytic`} component={lazy(() => import(`./analytic`))} />
      <Route path={`${match.url}/sales`} component={lazy(() => import(`./sales`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/Banners/Banner`} />
    </Switch>
  </Suspense>
)};

export default Dashboards;