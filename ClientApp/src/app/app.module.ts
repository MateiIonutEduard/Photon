import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { GenresComponent } from './genres/genres.component';
import { FindMovieComponent } from './find-movie/find-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ShowMovieComponent,
    SearchBarComponent,
    GenresComponent,
    FindMovieComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'show-movie', component: ShowMovieComponent },
      { path: 'find-movie', component: FindMovieComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
