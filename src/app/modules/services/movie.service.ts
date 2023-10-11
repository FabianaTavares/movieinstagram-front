import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

import { BestFriendsDTO } from './../models/movie-best-friends.model';
import { CommentsDTO } from './../models/movie-comments.model';
import { LikesDTO } from './../models/movie-likes.model';
import { PostsDTO } from './../models/movie-posts.model';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private loggedUser$: Subject<string> = new Subject<string>();

  constructor(private database: Database) {}

  setLoggedUserEvent(valor: string | undefined) {
    this.loggedUser$.next(valor);
  }

  getLoggedUserEvent() {
    return this.loggedUser$.asObservable();
  }

  /**
   * @description COMMENTS
   */
  getPostsList(): Observable<Array<PostsDTO>> {
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'movieInstagram/posts');
    return new Observable((observer: { next: (arg0: Array<PostsDTO>) => unknown }) => {
      onValue(
        endpoint,
        (snapshot) => {
          return observer.next(snapshot.val());
        },
        (error) => {
          return throwError(error);
        },
      );
    });
  }

  /**
   * @description COMMENTS
   */
  getCommentsList(): Observable<Array<CommentsDTO>> {
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'movieInstagram/comments');
    return new Observable((observer: { next: (arg0: Array<CommentsDTO>) => unknown }) => {
      onValue(
        endpoint,
        (snapshot) => {
          return observer.next(snapshot.val());
        },
        (error) => {
          return throwError(error);
        },
      );
    });
  }

  /**
   * @description LIKES
   */
  getLikesList(): Observable<Array<LikesDTO>> {
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'movieInstagram/likes');
    return new Observable((observer: { next: (arg0: Array<LikesDTO>) => unknown }) => {
      onValue(
        endpoint,
        (snapshot) => {
          return observer.next(snapshot.val());
        },
        (error) => {
          return throwError(error);
        },
      );
    });
  }

  /**
   * @description FRIENDS
   */
  getBestFriendList(): Observable<Array<BestFriendsDTO>> {
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'movieInstagram/bestFriends');
    return new Observable((observer: { next: (arg0: Array<BestFriendsDTO>) => unknown }) => {
      onValue(
        endpoint,
        (snapshot) => {
          return observer.next(snapshot.val());
        },
        (error) => {
          return throwError(error);
        },
      );
    });
  }
}
