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

  SetModel(): void {
    if (this.model.title || this.model.genres?.length) {
      let title: string | undefined = this.model.title;
      let typeOf: string | undefined = this.model.genres?.join(",");

      if (title) localStorage.setItem("title", title);
      if(typeOf) localStorage.setItem("genres", typeOf);
    }
  }

  GetModel(): SearchModel {
    console.log(this.model);
    if (this.model.title == '' || !this.model.genres?.length) {
      let title: string | null = localStorage.getItem("title");
      if (title) this.model.title = title;

      let all: string | null = localStorage.getItem("genres");

      if (all) {
        let genres: string[] | undefined = all.split(",");
        this.model.genres = genres;
      }
    }

    return this.model;
  }

  SetTitle(title: string): void {
    this.model.title = title;
    this.SetModel();
  }

  Push(genre: string): void {
    let of = this.model.genres?.indexOf(genre);
    if (of == -1) this.model.genres?.push(genre);
    this.SetModel();
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
