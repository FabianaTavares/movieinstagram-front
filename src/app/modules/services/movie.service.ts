import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { BestFriendsDTO } from './../models/movie-best-friends.model';
import { CommentsDTO } from './../models/movie-comments.model';
import { LikesDTO } from './../models/movie-likes.model';
import { PostsDTO } from './../models/movie-posts.model';
import {
  DataSnapshot,
  Database,
  child,
  get,
  getDatabase,
  list,
  listVal,
  object,
  onValue,
  ref,
} from '@angular/fire/database';
import { FirebaseApp, initializeApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private usuarioLogado$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private database: Database,
  ) {}

  setUsuarioLogadoEvent(valor: string | undefined) {
    this.usuarioLogado$.next(valor);
  }

  getUsuarioLogadoEvent() {
    return this.usuarioLogado$.asObservable();
  }

  private getSimpleRoute(route: string) {
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, `${route}/`);
    return onValue(
      endpoint,
      (snapshot) => {
        console.log(snapshot.val());
      },
      {
        onlyOnce: true,
      },
    );
  }

  /**
   * @description COMMENTS
   */
  getPostsList(): Observable<Array<PostsDTO>> {
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'posts');
    return Observable.create((observer: { next: (arg0: Array<PostsDTO>) => unknown }) => {
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
    //return this.http.get<Array<CommentsDTO>>(`${this.database}/comments`);
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'comments');
    return Observable.create((observer: { next: (arg0: Array<CommentsDTO>) => unknown }) => {
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
    //return this.http.get<Array<LikesDTO>>(`${this.database}/likes`).pipe(delay(2000));
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'likes');
    return Observable.create((observer: { next: (arg0: Array<LikesDTO>) => unknown }) => {
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
    //return this.http.get<Array<BestFriendsDTO>>(`${this.database}/bestFriends`).pipe(delay(2000));
    const dbRef = getDatabase();
    const endpoint = ref(dbRef, 'bestFriends');
    return Observable.create((observer: { next: (arg0: Array<BestFriendsDTO>) => unknown }) => {
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
