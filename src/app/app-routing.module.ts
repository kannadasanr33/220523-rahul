import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { UserComponent } from './user/user.component';

const routes: Routes = [
//  {component:LoginComponent,path:'login'},
//  {component:HomeComponent,path:'',canActivate:[AuthGuard]},
 {
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },  
//  {component:UserComponent,path:'user',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
