import {Component, OnInit} from '@angular/core';
import {GenreService} from "../services/genre/genre.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private genreService: GenreService) {
  }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById('search')).value = '';
  }

  SearchMovies(): void {
    let title: string = (<HTMLInputElement>document.getElementById('search')).value;
    this.genreService.SetTitle(title);

    this.router.navigate(['/find-movie'])
      .then(res => (<HTMLInputElement>document.getElementById('search')).value = '');
  }
}
