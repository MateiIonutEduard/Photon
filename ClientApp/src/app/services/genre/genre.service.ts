import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchModel} from "../movie/movie.service";

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly model: SearchModel;
  private baseUrl: string = '/api/movie/genre/';

  constructor(private client: HttpClient) {
    this.model = {
      title: '',
      genres: []
    }
  }

  AllGenres(): Observable<Genre[]> {
    return this.client.get<Genre[]>(this.baseUrl);
  }

  GetModel(): SearchModel {
      return this.model;
  }

  SetTitle(title: string): void {
    this.model.title = title;
  }

  Push(genre: string): void {
    let of = this.model.genres?.indexOf(genre);
    if(of == -1) this.model.genres?.push(genre);
  }

  Pop(): void {
    this.model.title = undefined;
    this.model.genres = [];
  }
}

export interface Genre {
  name: string;
  index: number;
}
