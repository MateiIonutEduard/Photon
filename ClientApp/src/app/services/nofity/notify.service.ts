import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private subject: Subject<boolean>;

  constructor() {
    this.subject = new Subject<boolean>();
  }

  SendSignal(signal?: boolean) {
    this.subject.next(signal);
  }

  GetSignal(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
