import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { animation: 'decommerce' },
      },
      {
        path: 'new',
        component: RegisterComponent,
      },
      {
        path: ':id',
        component: RegisterComponent,
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
