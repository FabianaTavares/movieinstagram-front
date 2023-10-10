import { PostsDTO } from './movie-posts.model';
import { CommentsDTO } from './movie-comments.model';

export interface PostWithCommentsDTO extends PostsDTO {
  comments: CommentsDTO[];
  likes: string[];
}
