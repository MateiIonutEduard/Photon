import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie, MovieService} from "../services/movie/movie.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  public movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {
    movieService.PopularMovies().subscribe(res => {
      this.movies = res;

      for(let k = 0; k < this.movies.length; k++)
      {
        if(!this.movies[k].info.image_url)
          this.movies[k].info.image_url = '/assets/cinema.png';
      }
    });
  }

  ViewMovie(id: string): void {
    localStorage.setItem('id', id);
    this.router.navigate(['/show-movie'])
      .then(res => console.log(res));
  }

  Refresh(): void {
    this.router.navigate(['/'])
      .then(r => console.log(r));
  }

  ngOnDestroy() {
    this.movies =[];
  }
}
