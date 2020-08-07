import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { HaulCreatorComponent } from './features/haul-creator/haul-creator.component';
import { AuthGuard } from './services/auth.guard';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'createHaul', component: HaulCreatorComponent, canActivate: [AuthGuard]},
  { path: 'myProfile', component: ProfilePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
