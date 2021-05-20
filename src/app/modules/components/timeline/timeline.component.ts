import { Component, OnInit } from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { CommentsDTO } from './../../models/movie-comments.model';
import { LikesDTO } from './../../models/movie-likes.model';
import { PostsDTO } from './../../models/movie-posts.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  postsListas: PostsDTO[] = [];
  commentsDTO: CommentsDTO[] = [];
  likesDTO: LikesDTO[] = [];

  qtdPosts!: number;
  qtdComentarios!: number;
  qtdCurtidas!: number;

  // tslint:disable-next-line: no-inferrable-types
  loading: boolean = false;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.recuperaListaPosts();
    this.recuperaListaComments();
    this.recuperaListaLikes();
  }

  recuperaListaPosts() {
    this.movieService.getPostsList().subscribe(
      (response) => {
        this.postsListas = response;
        this.qtdPosts = this.postsListas.length;
        this.loading = false;
      }, () => this.loading = false
    );
  }

  recuperaListaComments() {
    this.movieService.getCommentsList().subscribe(
      (response) => {
        this.commentsDTO = response;
        this.qtdComentarios = this.commentsDTO.length;
      }, () => this.loading = false

    );
  }

  recuperaListaLikes() {

    this.movieService.getLikesList().subscribe(
      (response) => {
        this.likesDTO = response;
        this.qtdCurtidas = this.likesDTO.length;
      }, () => this.loading = false
    );
  }
}
