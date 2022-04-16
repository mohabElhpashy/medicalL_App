import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Banners_Media from "./Banners_Media";
import AddBannerMedia from './forms/Banners_Media/AddForm/Index'
// import EditForm from './forms/Targettype/EditForm/EditForm/index'



import TargetType from './TargetType'
import AddtargetType from './forms/Banners_Media/AddForm/Index'
import EditService from './forms/Banners_Media/EditForm/Index';

import EditTargettype from './forms/Targettype/EditForm/Index'
import Banner from "./Banner";
import AddBanners from '../Banners/forms/Banners/AddForm/Index'
import EditBanners from './forms/Banners/EditForm/Index'
import Add_Service_Provider from  '../Banners/forms/Targettype/AddForm/Index';
import Delev from '../Banners/Delev'
import ADDDelev from '../Banners/forms/Delev/AddForm/Index';
import Edit_delv from '../Banners/forms/Delev/EditForm/Index'

export default function index({ match }) {
  return (
    <Switch>
      {/* banners_media */}
           <Route path={`${match.url}/BannersMedia`} component={Banners_Media} />
           <Route path={`${match.url}/Addservice`} component={AddtargetType} />
           <Route path={`${match.url}/edit_service_ReadForm`} component={EditService} />
    {/* targetType */}
           <Route path={`${match.url}/targetType`} component={TargetType} />
           <Route path={`${match.url}/AddserviceProvider`} component={Add_Service_Provider} />
           <Route path={`${match.url}/edit_serviceProvider_ReadForm`} component={EditTargettype} /> 

    {/* BANNER */}
    <Route path={`${match.url}/Banner`} component={Banner} />
    <Route path={`${match.url}/AddCategories`} component={AddBanners} />
    <Route path={`${match.url}/edit_Categories_ReadForm`} component={EditBanners} />


 {/* Delev */}
 <Route path={`${match.url}/delivery`} component={Delev} />
  <Route path={`${match.url}/AddDelev`} component={ADDDelev} />
       <Route path={`${match.url}/edit_delv_ReadForm`} component={Edit_delv} />






    </Switch>
  );
}
