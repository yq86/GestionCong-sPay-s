import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DemandesComponent } from './components/demandes/demandes.component';

const routes: Routes = [];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'employee-demandes',
        component: DemandesComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
