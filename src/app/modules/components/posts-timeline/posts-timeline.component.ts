import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';

import { CommentsDTO } from '../../models/movie-comments.model';
import { LikesDTO } from '../../models/movie-likes.model';
import { PostWithCommentsDTO } from '../../models/movie-posts-coments.model';
import { PostsDTO } from '../../models/movie-posts.model';
import { MovieService } from '../../services/movie.service';
import { BestFriendsDTO } from './../../models/movie-best-friends.model';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-posts-timeline',
  templateUrl: './posts-timeline.component.html',
  styleUrls: ['./posts-timeline.component.scss'],
})
export class PostsTimelineComponent implements OnInit {
  postLists!: PostsDTO[];
  commentsList: CommentsDTO[] = [];
  likesDTO: LikesDTO[] = [];
  bestfriend: BestFriendsDTO[] = [];
  loading: boolean = false;
  postWithCommentsDTO: PostWithCommentsDTO[] = [];
  userSelected: string = 'superman';
  subscription!: Subscription;
  formPostGroup!: UntypedFormGroup;

  usersLikes!: number;
  amountLikes!: number;
  amountComments!: number;
  public isActive: boolean = false;
  componentIsActive: boolean = true;

  constructor(
    private movieService: MovieService,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.subscription = this.movieService.getLoggedUserEvent().subscribe((userTab: any) => {
      this.userSelected = userTab;
    });
  }

  ngOnInit(): void {
    this.retrievePostList();
    this.formCreate();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  formCreate() {
    this.formPostGroup = this.formBuilder.group({
      inputComment: ['', [Validators.required]],
    });
  }

  retrievePostList() {
    combineLatest([
      this.movieService.getPostsList(),
      this.movieService.getCommentsList(),
      this.movieService.getLikesList(),
      this.movieService.getBestFriendList(),
    ])
      .pipe(
        map(([posts, comments, likes, bestFriends]) => ({
          posts,
          comments: comments,
          likes,
          bestFriends,
        })),
        takeWhile(() => this.componentIsActive),
      )
      .subscribe((data) => {
        const postsMap = new Map<string, PostWithCommentsDTO>();

        for (const post of data.posts) {
          postsMap.set(post.id, { ...post, comments: [], likes: [] });
        }

        for (const coment of data.comments) {
          postsMap.get(coment.postId)?.comments?.push(coment);
        }

        for (const like of data.likes) {
          postsMap.get(like.postId)?.likes?.push(like.user);
        }

        this.postWithCommentsDTO = Array.from(postsMap.values());
        this.bestfriend = data.bestFriends;
      });
  }

  userAlreadyLiked(postWithComments: PostWithCommentsDTO): boolean {
    return postWithComments.likes.indexOf(this.userSelected) > 0 ?? true;
  }

  likeHeartPost(postWithComments: PostWithCommentsDTO) {
    this.isActive = !this.isActive;
    const index = postWithComments?.likes?.indexOf(this.userSelected);
    if (index === -1) {
      postWithComments.likes.push(this.userSelected);
    } else {
      postWithComments.likes.splice(index, 1);
    }
  }

  Save(postWithComments: PostWithCommentsDTO) {
    const comment = this.formPostGroup.get('inputComment')!.value;
    this.addcomment(postWithComments, comment);
    this.formPostGroup.reset();
  }

  addcomment(postWithComments: PostWithCommentsDTO, textComment: string) {
    postWithComments.comments.push({
      id: '',
      postId: postWithComments.id,
      comment: textComment,
      user: this.userSelected,
    });
  }
}
