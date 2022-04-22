import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  private subject: Subject<number>;

  constructor() {
    this.subject = new Subject<number>();
  }

  SetPage(pages?: number) {
    this.subject.next(pages);
  }

  GetPage(): Observable<number> {
    return this.subject.asObservable();
  }
}
