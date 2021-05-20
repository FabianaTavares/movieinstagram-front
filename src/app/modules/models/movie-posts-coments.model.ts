import { PostsDTO } from './movie-posts.model';
import { LikesDTO } from './movie-likes.model';
import { CommentsDTO } from "./movie-comments.model";

export interface PostComComentariosDTO extends PostsDTO {
  coments: CommentsDTO[];
  likes: string[];
}
