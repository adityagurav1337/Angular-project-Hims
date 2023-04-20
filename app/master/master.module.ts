import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { LandingComponent } from './landing/landing.component';
import { StatesComponent } from './states/states.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistrictComponent } from './district/district.component';




@NgModule({
  declarations: [
    LandingComponent,
    StatesComponent,
    HeaderComponent,
    SidebarComponent,
    DistrictComponent,

  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MasterModule { }
