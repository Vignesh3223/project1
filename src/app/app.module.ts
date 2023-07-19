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
//Filter Status pipe
import { FilterstatusPipe } from '../shared/filterstatus.pipe';
//Material UI Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';

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
    FilterstatusPipe,
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
    AvatarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSortModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
