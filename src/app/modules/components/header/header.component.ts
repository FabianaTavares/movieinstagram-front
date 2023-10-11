import { Component, Input, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() amountPosts!: number;
  @Input() amountComments!: number;
  @Input() amountLikes!: number;

  @ViewChild('staticTabs', { static: false }) staticTabs!: TabsetComponent;

  activeElement: number = 1;
  userSelected: string = 'superman';

  listActives: any[] = [
    { id: 1, img: 'assets/img/batman.png', user: 'batman' },
    { id: 2, img: 'assets/img/superman.png', user: 'superman' },
    { id: 3, img: 'assets/img/wonderWoman.png', user: 'wonderWoman' },
  ];

  constructor(private movieService: MovieService) {
    this.movieService.setLoggedUserEvent(this.listActives[1].user);
  }

  selectTab(index: number, user: string) {
    this.activeElement = index;
    this.userSelected = user;
    this.movieService.setLoggedUserEvent(user);
  }
}
