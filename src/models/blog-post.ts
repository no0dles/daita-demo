import {Author} from './author';

export class BlogPost {
  slug!: string;
  title!: string;
  content!: string;
  author!: Author;
  authorId!: string;
  created!: Date;
}
