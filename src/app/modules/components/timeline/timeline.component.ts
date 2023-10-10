import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { CommentsDTO } from './../../models/movie-comments.model';
import { LikesDTO } from './../../models/movie-likes.model';
import { PostsDTO } from './../../models/movie-posts.model';

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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loading = true;
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
}
