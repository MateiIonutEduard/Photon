import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie, MovieService} from "../services/movie/movie.service";
import {Router} from "@angular/router";
import {GenreService} from "../services/genre/genre.service";
import {NavigateService} from "../services/navigate/navigate.service";
import {NotifyService} from "../services/nofity/notify.service";

@Component({
  selector: 'app-find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.css']
})
export class FindMovieComponent implements OnDestroy {
  public movies: Movie[] = [];
  private readonly task: any;

  private page: any = 1;
  private pages: any = 1;

  constructor(private movieService: MovieService, private notify: NotifyService, private navigate: NavigateService, private genreService: GenreService, private router: Router) {
    let model = genreService.GetModel();
    movieService.SearchMovies(model).subscribe(res => {
      this.movies = res.movies;
      navigate.SetPage(res.movies.length, 1, res.pages);

      for(let k = 0; k < this.movies.length; k++)
      {
        let url = this.movies[k].info.image_url;
        if(url == undefined) this.movies[k].info.image_url = '/assets/cinema.png';
      }
    });

    this.task = setInterval(() => this.UpdateMovies(),
      50);
  }

  UpdateMovies(): any {
    this.notify.GetSignal().subscribe(res => {
      if (res == -1) {
        let model = this.genreService.GetModel();
        this.movieService.SearchMovies(model).subscribe(res => {
          this.movies = res.movies;
          this.navigate.SetPage(res.movies.length,1, res.pages);

          for (let k = 0; k < this.movies.length; k++) {
            let url = this.movies[k].info.image_url;
            if (url == undefined) this.movies[k].info.image_url = '/assets/cinema.png';
          }
        });
      } else if (res == 1) {
        this.navigate.GetPage().subscribe(res => {
          if (this.page != res.page) {
            this.page = res.page;
            const model = this.genreService.GetModel();
            this.movieService.SearchPageMovies(this.page, model).subscribe(res => {
              this.movies = res.movies;

              for (let k = 0; k < this.movies.length; k++) {
                let url = this.movies[k].info.image_url;
                if (url == undefined) this.movies[k].info.image_url = '/assets/cinema.png';
              }
            });
          }
        });
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
    clearInterval(this.task);
  }
}
