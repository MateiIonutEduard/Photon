import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Page} from "../movie/movie.service";

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  private subject: Subject<Page>;

  constructor() {
    this.subject = new Subject<Page>();
  }

  SetPage(total: any, page: any, pages: any) {

    const obj: Page = {
      page: page,
      pages: pages,
      total: total
    };

    this.subject.next(obj);
  }

  GetPage(): Observable<Page> {
    return this.subject.asObservable();
  }
}
