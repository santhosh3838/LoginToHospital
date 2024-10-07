import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';

export const routes: Routes = [
 {
path: '',
redirectTo: 'Login',
pathMatch: 'full'
 },
{
    path: 'Login',
    component: LoginComponent
},
{
    path: 'dashboard', component: DashBoardComponent
},

];
