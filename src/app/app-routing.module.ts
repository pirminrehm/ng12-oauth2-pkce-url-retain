import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NewPageComponent } from './new-page/new-page.component';

const routes: Routes = [
  {
    path: 'after-login',
    component: AfterLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-page',
    component: NewPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
