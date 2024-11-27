import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullDetailsComponent } from './full-details/full-details.component';

const routes: Routes = [
  { path : 'bank/:bankname', component : FullDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
