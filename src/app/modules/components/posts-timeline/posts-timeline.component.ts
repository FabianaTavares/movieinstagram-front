import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';

import { CommentsDTO } from '../../models/movie-comments.model';
import { LikesDTO } from '../../models/movie-likes.model';
import { PostComComentariosDTO } from '../../models/movie-posts-coments.model';
import { PostsDTO } from '../../models/movie-posts.model';
import { MovieService } from '../../services/movie.service';
import { BestFriendsDTO } from './../../models/movie-best-friends.model';

@Component({
  selector: 'app-posts-timeline',
  templateUrl: './posts-timeline.component.html',
  styleUrls: ['./posts-timeline.component.scss']
})
export class PostsTimelineComponent implements OnInit {

  postsListas!: PostsDTO[];
  comentsListas: CommentsDTO[] = [];
  likesDTO: LikesDTO[] = [];
  bestfriend: BestFriendsDTO[] = [];
  loading: boolean = false;
  testes: PostComComentariosDTO[] = [];
  userSelected: string = '';
  subscription!: Subscription;
  formPostGroup!: FormGroup;

  usersLikes!: number;
  qtdCurtidas!: number;
  qtdComentarios!: number;
  public isActive:boolean = false;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
  ) {
    this.subscription = this.movieService.getUsuarioLogadoEvent().subscribe(
      (usuarioTab: any) => {
        this.userSelected = usuarioTab;
      }
    );
   }

  ngOnInit(): void {
    this.recuperaListaPosts();
    this.criarForm();
  }

   ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  criarForm(){
    this.formPostGroup = this.formBuilder.group({
    inputComent: ["", [Validators.required]]
  });
  }

  recuperaListaPosts() {
    const buscaServicos = forkJoin([
      this.movieService.getPostsList(),
      this.movieService.getCommentsList(),
      this.movieService.getLikesList(),
      this.movieService.getBestFriendList(),
    ]);

    buscaServicos.subscribe(
      ([posts, coments, likes, bestFriends]: [PostsDTO[], CommentsDTO[], LikesDTO[], BestFriendsDTO[]]) => {

        const postsMap = new Map<string, PostComComentariosDTO>();
        for (const post of posts) {
          postsMap.set(post.id, { ...post, coments: [], likes: [] });
        }
        for (const coment of coments) {
          postsMap.get(coment.postId)?.coments?.push(coment);
        }
        for (const like of likes) {
          postsMap.get(like.postId)?.likes?.push(like.user);
        }

        this.testes = Array.from(postsMap.values());

        this.bestfriend = bestFriends;

      }
    );
  }

  userJaCurtiu(item: PostComComentariosDTO): boolean {
    return item.likes.indexOf(this.userSelected) === -1 ? false : true;
  }

  likeHeartPost(item: PostComComentariosDTO){
    this.isActive = !this.isActive; // necessário?
    const index = item?.likes?.indexOf(this.userSelected);
    if (index == -1) {
      item.likes.push(this.userSelected);
    } else {
      item.likes.splice(index, 1);
    }
  }

  salvar(item: PostComComentariosDTO){
    const comentario = this.formPostGroup.get("inputComent")!.value;
    this.addComentario(item, comentario);
    this.formPostGroup.reset();
  }

  addComentario(item: PostComComentariosDTO, textoComentario: string){
    item.coments.push({
      id: "",
      postId: item.id,
      comment: textoComentario,
      user: this.userSelected,
    });

  }

}
