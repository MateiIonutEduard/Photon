import {Component, OnDestroy} from '@angular/core';
import {Genre, GenreService} from "../services/genre/genre.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnDestroy {
  public genres: Genre[] = [];

  constructor(private router: Router, private genreService: GenreService) {
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
    this.router.navigate(['/find-movie'])
      .then(res => console.log(res));
  }

  ngOnDestroy() {
    this.genres = [];
  }
}
