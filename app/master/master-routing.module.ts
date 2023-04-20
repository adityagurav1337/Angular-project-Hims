import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { LandingComponent } from './landing/landing.component';
import { StatesComponent } from './states/states.component';


const routes: Routes = [
  {path:"",component:LandingComponent,children:[
    {path:"states",component:StatesComponent},
    {path:"district",component:DistrictComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
