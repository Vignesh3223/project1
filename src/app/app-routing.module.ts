import { NgModule } from '@angular/core';
//Routing Modules
import { RouterModule, Routes } from '@angular/router';
//Login Component
import { LoginComponent } from './login/login.component';
//Signup Component
import { SignupComponent } from './signup/signup.component';
//Products Component
import { ProductsComponent } from './products/products.component';
//Home Component
import { HomeComponent } from './home/home.component';
//Controls Component
import { ControlsComponent } from './controls/controls.component';
//Cart Component
import { CartComponent } from './cart/cart.component';
//Viewtask Component
import { ViewtaskComponent } from './viewtask/viewtask.component';
//Authentication Guard
import { AuthGuard } from 'src/shared/authguard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'control', component: ControlsComponent
  },
  {
    path: 'cart', component: CartComponent, canActivate: [AuthGuard]
  },
  {
    path: 'viewtask', component: ViewtaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
