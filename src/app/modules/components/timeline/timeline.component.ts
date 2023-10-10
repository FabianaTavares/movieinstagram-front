import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { CommentsDTO } from './../../models/movie-comments.model';
import { LikesDTO } from './../../models/movie-likes.model';
import { PostsDTO } from './../../models/movie-posts.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  postsLists: PostsDTO[] = [];
  commentsDTO: CommentsDTO[] = [];
  likesDTO: LikesDTO[] = [];
  amountPosts!: number;
  amountComments!: number;
  amountLikes!: number;
  loading: boolean = false;
  lang: string = 'pt-BR';
  selectedLanguageName!: string;
  selectedLanguage!: string;

  constructor(
    private movieService: MovieService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.selectedLanguage = this.languageService.selectedLanguage;
    this.selectedLanguageName =
      this.selectedLanguage === 'pt-BR' ? this.getLangs()[0] : this.getLangs()[1];
    this.retrievePostList();
    this.retrieveCommentsList();
    this.retrieveLikesList();
  }

  retrievePostList() {
    this.movieService.getPostsList().subscribe(
      (response) => {
        this.postsLists = response;
        this.amountPosts = this.postsLists.length;
        this.loading = false;
      },
      () => (this.loading = false),
    );
  }

  retrieveCommentsList() {
    this.movieService.getCommentsList().subscribe(
      (response) => {
        this.commentsDTO = response;
        this.amountComments = this.commentsDTO.length;
      },
      () => (this.loading = false),
    );
  }

  retrieveLikesList() {
    this.movieService.getLikesList().subscribe(
      (response) => {
        this.likesDTO = response;
        this.amountLikes = this.likesDTO.length;
      },
      () => (this.loading = false),
    );
  }

  changeLang(languageSelect: string): void {
    this.selectedLanguageName = languageSelect;
    this.selectedLanguage = languageSelect;
    this.languageService.updateLanguage(this.selectedLanguageName);
  }

  getLangs(): string[] {
    return ['pt-BR', 'en-US'];
  }
}
