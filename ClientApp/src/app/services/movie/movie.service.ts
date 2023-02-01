import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl: string;

  constructor(private client: HttpClient) {
    this.baseUrl = "/api/movie/";
  }

  GetMovie(id: string): Observable<Movie> {
    let url = `${this.baseUrl}/${id}`;
    return this.client.get<Movie>(url);
  }

  PopularMovies(): Observable<Movie[]> {
    return this.client.get<Movie[]>(this.baseUrl);
  }

  SearchMovies(model: SearchModel): Observable<MovieModel> {
    let formData = new FormData();
    if(model.title) formData.append('title', model.title);

    if(model.genres)
    {
      for(let genre of model.genres)
        formData.append('genres', genre);
    }

    return this.client.post<MovieModel>(this.baseUrl, formData);
  }

  SearchPageMovies(page: number, model: SearchModel): Observable<MovieModel> {
    let formData = new FormData();
    if(model.title) formData.append('title', model.title);
    const url: string = `${this.baseUrl}?page=${page}`;
    if(model.genres)
    {
      for(let genre of model.genres)
        formData.append('genres', genre);
    }

    return this.client.post<MovieModel>(url, formData);
  }
}

export interface MovieModel
{
  pages?: number,
  movies: Movie[];
}

export interface SearchModel
{
  title?: string;
  genres?: string[];
}

export interface Movie
{
  id: string;
  title: string;
  year: number;
  info: MovieInfo;
  fuzzyHash: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

export interface MovieInfo
{
  directors: string[];
  release_date: Date;
  rating: number;
  genres: string[];
  image_url: string;
  plot: string;
  rank?: number;
  running_time_secs?: number
  actors: string[];
}

export interface Page {
  page: number;
  pages: number;
  total: number;
}
