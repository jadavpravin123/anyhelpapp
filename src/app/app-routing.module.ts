import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './modules/layout/home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BuyerinqueryComponent} from './modules/buyermodule/buyerinquery/buyerinquery.component';
import {SelleinfoComponent} from './modules/sellermodule/selleinfo/selleinfo.component';
import {MessagereuestComponent} from './modules/layout/messagereuest/messagereuest.component';
const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'message', component: MessagereuestComponent },
   { path: 'inquery', component: BuyerinqueryComponent }, // this is the component with the <router-outlet> in the template
   { path: 'business', component: SelleinfoComponent },
  //{ path: '',   redirectTo: '/first-component', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page


  // {
  //   path: 'first-component',
  //   component: FirstComponent, // this is the component with the <router-outlet> in the template
  //   children: [
  //     {
  //       path: 'child-a', // child route path
  //       component: ChildAComponent, // child route component that the router renders
  //     },
  //     {
  //       path: 'child-b',
  //       component: ChildBComponent, // another child route component that the router renders
  //     },
  //  canActivate: [YourGuard],
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
