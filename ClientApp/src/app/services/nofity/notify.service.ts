import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private subject: Subject<number>;

  constructor() {
    this.subject = new Subject<number>();
  }

  SendSignal(signal?: number) {
    this.subject.next(signal);
  }

  GetSignal(): Observable<number> {
    return this.subject.asObservable();
  }
}
