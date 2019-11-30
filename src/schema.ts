import {Schema} from '@daita/core';
import {Author} from './models/author';
import {BlogPost} from './models/blog-post';
import {BlogComment} from './models/blog-comment';

const schema = new Schema();

schema.table(BlogPost, {key: t => t.slug});
schema.table(BlogComment);
schema.table(Author);

export = schema;
