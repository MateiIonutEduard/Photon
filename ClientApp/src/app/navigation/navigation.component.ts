import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigateService} from "../services/navigate/navigate.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {
  public last: number = 0;
  public page: number = 1;

  public next: number = 1;
  public pages: number = 1;

  constructor(private navigate: NavigateService) {
    this.navigate.GetPage().subscribe(res => {
      this.pages = res;
      this.page = 1;
      this.next = res > 1 ? 2 : 1;
      this.last = 0;
    });
  }

  LastPage(): void {
    if(this.last > 0)
    {
      this.next = this.page;
      this.page = this.last;
      this.last--;
    }
  }

  NextPage(): void {
    if(this.page < this.pages)
    {
      this.last = this.page;
      this.page = this.next;
      this.next++;
    }
  }

  ngOnDestroy() {
    this.last = this.next = 0;
    this.page = this.pages = 0;
    this.navigate.SetPage(0);
  }
}
