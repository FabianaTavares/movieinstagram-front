import { PostsDTO } from './movie-posts.model';
import { CommentsDTO } from './movie-comments.model';

export interface postWithCommentsDTO extends PostsDTO {
  comments: CommentsDTO[];
  likes: string[];
}
