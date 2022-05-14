import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeagueDescriptionComponent } from './components/league-description/league-description.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserRestService } from './services/userRest/user-rest.service';
import { SearchPipe } from './pipes/search.pipe';
import { TeamSearchPipe } from './pipes/team-search.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    LeaguesComponent,
    TournamentsComponent,
    NavBarComponent,
    FooterComponent,
    LeagueDescriptionComponent,
    UsersComponent,
    ProfileComponent,
    SearchPipe,
    TeamSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [
    UserRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
