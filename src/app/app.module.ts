import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//HTTPClient Module
import { HttpClientModule } from '@angular/common/http';
//Angular Forms Module
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//Routing Module
import { AppRoutingModule } from './app-routing.module';
//App(root) Component 
import { AppComponent } from './app.component';
//Login Component
import { LoginComponent } from './login/login.component';
//Signup Component
import { SignupComponent } from './signup/signup.component';
//primeNG Button Module
import { ButtonModule } from 'primeng/button';
//primeNG Toast Module
import { ToastModule } from 'primeng/toast';
//primeNG Message service
import { MessageService } from 'primeng/api';
//primeNG TabMenu Module
import { TabMenuModule } from 'primeng/tabmenu';
//Products Component
import { ProductsComponent } from './products/products.component';
//Home Component
import { HomeComponent } from './home/home.component';
//Navbar Component
import { NavbarComponent } from './navbar/navbar.component';
//primeNG Card Module
import { CardModule } from 'primeng/card';
//Controls Component
import { ControlsComponent } from './controls/controls.component';
//primeNG Avatar Module
import { AvatarModule } from 'primeng/avatar';
//Cart Component
import { CartComponent } from './cart/cart.component';
//Viewtask Component
import { ViewtaskComponent } from './viewtask/viewtask.component';
//Sort pipe
import { SortPipe } from 'src/shared/sort.pipe';
//Filter pipe
import { FilterPipe } from '../shared/filter.pipe';
//Search pipe
import { SearchPipe } from '../shared/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    HomeComponent,
    NavbarComponent,
    ControlsComponent,
    CartComponent,
    ViewtaskComponent,
    SortPipe,
    FilterPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    ToastModule,
    TabMenuModule,
    CardModule,
    AvatarModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
