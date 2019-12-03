# daita-demo

## Installation instructions
```
npm install
npm run migrate
```

## Run api
```
npm start
```

## Configuration
ENV PORT = 4000
ENV JWT_SECRET = replace_me
ENV POSTGRES_URL = postgres://localhost/blog

## API resources

GET /api/author
PUT /api/author/:id
GET /api/author/:id/blog
GET /api/author/:id/author

GET /api/blog-post
POST /api/blog-post
PUT /api/blog-post/:slug
DELETE /api/blog-post/:slug

GET /api/blog-comment/:slug/comment
POST /api/blog-comment/:slug/comment

## Documentation
The documentation about daita is available [here](https://app.gitbook.com/@no0dles/s/daita/)
