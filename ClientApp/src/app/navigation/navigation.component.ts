import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigateService} from "../services/navigate/navigate.service";
import {MovieService} from "../services/movie/movie.service";
import {NotifyService} from "../services/nofity/notify.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {
  public last: number = 0;
  public page: number = 1;

  public next: number = 2;
  public pages: number = 1;
  public total: any;

  constructor(private navigate: NavigateService, private notify: NotifyService) {
    this.navigate.GetPage().subscribe(res => {
      this.page = res.page;
      this.pages = res.pages;
      this.next = res.pages > 1 ? res.page + 1 : 1;
      this.last = res.page - 1;
      this.total = res.total;
    });
  }

  LastPage(): void {
    this.notify.SendSignal(1);

    if(this.last > 0)
    {
      this.next = this.page;
      this.page = this.last;
      this.last--;

      this.navigate.SetPage(this.total, this.page, this.pages);
    }
  }

  NextPage(): void {
    this.notify.SendSignal(1);

    if(this.page < this.pages)
    {
      this.last = this.page;
      this.page = this.next;
      this.next++;

      this.navigate.SetPage(this.total, this.page, this.pages);
    }
  }

  ngOnDestroy() {
    this.last = this.next = 0;
    this.page = this.pages = 0;
    this.navigate.SetPage(this.total, 1, 1);
  }
}
