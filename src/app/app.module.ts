import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RolesComponent } from './components/roles/roles.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AdminsComponent } from './components/admins/admins.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RolesComponent,
    LoaderComponent,
    AdminsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, 
    MatMenuModule,
    BrowserAnimationsModule, 
    NoopAnimationsModule, AppRoutingModule,
    SelectDropDownModule,
    ReactiveFormsModule, FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    NgxLoadingModule.forRoot({}),
    NgxDatatableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
