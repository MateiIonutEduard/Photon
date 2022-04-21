import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie, MovieService} from "../services/movie/movie.service";

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})
export class ShowMovieComponent implements OnDestroy {
  public movie: any;
  private id: string;

  constructor(private movieService: MovieService) {
    this.id = "";
    let id = localStorage.getItem('id');
    if(id != null) this.id = id;

    if(id != null) {
      this.movieService.GetMovie(this.id).subscribe(res => {
        this.movie = res;
        if(!this.movie.info.image_url) this.movie.info.image_url = '/assets/logo.jpg';
        if(!this.movie.info.plot) this.movie.info.plot = 'There is currently no description for this movie!';
        if(!this.movie.info.running_time_secs) this.movie.info.running_time_secs = 'Unknown';
      });
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('id');
  }
}
