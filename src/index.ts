import * as express from 'express';
import * as jwt from 'express-jwt';
import * as bodyParser from 'body-parser';
import * as authorRoute from './routes/author';
import * as blogPostRoute from './routes/blog-post';
import * as blogCommentRoute from './routes/blog-comment';

const jwtSecret = process.env.JWT_SECRET || 'replace_me';
const port = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(jwt({secret: jwtSecret}));

app.use('/api/author', authorRoute);
app.use('/api/blog-post', blogPostRoute);
app.use('/api/blog-comment', blogCommentRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
