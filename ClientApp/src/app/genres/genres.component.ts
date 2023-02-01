import {Component, OnDestroy} from '@angular/core';
import {Genre, GenreService} from "../services/genre/genre.service";
import {Router} from "@angular/router";
import {SearchModel} from "../services/movie/movie.service";
import { NotifyService } from '../services/nofity/notify.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnDestroy {
  public genres: Genre[] = [];

  constructor(private router: Router, private notify: NotifyService, private genreService: GenreService) {
    genreService.AllGenres().subscribe(res => {
      this.genres = res;
    });
  }

  SelectGenre(): void {
    let boxes: any = document.getElementsByName('check');
    this.genreService.Pop();

    for(const box of boxes)
    {
      if(box.checked) {
        let index: string = box.value;
        this.genreService.Push(index);
      }
    }
  }

  FindMovies(): void {
    let title: string = (<HTMLInputElement>document.getElementById('search')).value;
    if (title) this.genreService.SetTitle(title);
    let model: SearchModel = this.genreService.GetModel();
    console.log(model);
    if(model.title || model.genres?.length) {
      this.router.navigate(['/find-movie'])
        .then(res => {
          this.notify.SendSignal(-1);
        });
    }
  }

  ngOnDestroy() {
    this.genres = [];
  }
}
