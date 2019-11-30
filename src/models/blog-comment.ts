import {Author} from './author';
import {BlogPost} from './blog-post';

export class BlogComment {
  id!: string;
  text!: string;
  blog!: BlogPost;
  blogSlug!: string;
  authorId!: string;
  author!: Author;
  created!: Date;
}
