import {Component, OnInit} from '@angular/core';
import {GenreService} from "../services/genre/genre.service";
import {Router} from "@angular/router";
import {NotifyService} from "../services/nofity/notify.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private router: Router, private notify: NotifyService, private genreService: GenreService) {
  }

  KeyDown($event: KeyboardEvent) {
    if ($event.key === "Enter")
      this.SearchMovies();
  }

  SearchMovies(): void {
    let title: string = (<HTMLInputElement>document.getElementById('search')).value;
    this.genreService.Pop();

    if(title) this.genreService.SetTitle(title);
    const model = this.genreService.GetModel();

    if(model.title || model.genres?.length) {
      this.router.navigate(['/find-movie'])
        .then(res => {
          (<HTMLInputElement>document.getElementById('search')).value = '';
          this.notify.SendSignal(-1);
        });
    }
  }
}
