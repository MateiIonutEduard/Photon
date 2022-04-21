import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie, MovieService} from "../services/movie/movie.service";
import {Router} from "@angular/router";
import {GenreService} from "../services/genre/genre.service";

@Component({
  selector: 'app-find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.css']
})
export class FindMovieComponent implements OnDestroy {
  public movies: Movie[] = [];

  constructor(private movieService: MovieService, genreService: GenreService, private router: Router) {
    let model = genreService.GetModel();
    movieService.SearchMovies(model).subscribe(res => {
      this.movies = res;

      for(let k = 0; k < this.movies.length; k++)
      {
        if(!this.movies[k].info.image_url)
          this.movies[k].info.image_url = '/assets/cinema.png';
      }
    });
  }

  WatchMovie(id: string): void {
    localStorage.setItem('id', id);
    this.router.navigate(['/show-movie'])
      .then(res => console.log(res));
  }

  Refresh(): void {
    this.router.navigate(['/'])
      .then(r => console.log(r));
  }

  ngOnDestroy() {
    this.movies = [];
  }
}
