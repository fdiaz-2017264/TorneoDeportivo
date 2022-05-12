import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { LeagueDescriptionComponent } from './components/league-description/league-description.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { UsersComponent } from './components/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: '', canActivate: [UserGuard], component: HomeComponentComponent},
  {path: 'home', canActivate: [UserGuard], component: HomeComponentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tournaments', canActivate: [UserGuard], component: TournamentsComponent},
  {path: 'users', canActivate: [UserGuard, AdminGuard], component: UsersComponent},
  {path: 'league', canActivate: [UserGuard], component: LeaguesComponent},
  {path: 'leagueDescription', canActivate: [UserGuard], component: LeagueDescriptionComponent},
  {path: 'profile/:id', canActivate: [UserGuard], component: ProfileComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
