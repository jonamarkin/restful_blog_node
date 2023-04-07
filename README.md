# My Blog API

This is a simple RESTful API for a blog application. It is built with Node.js and uses MongoDB for data storage.

## Getting Started

To get started, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Start the development server using `npm start`.

## Postman Documentation

Click [here](https://documenter.getpostman.com/view/26444770/2s93RZNqar) to view the documentation.

## BASE URL

Please `localhost:3000` used in the documentation with `https://blogapi-3ef3.onrender.com`

## Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login an existing user

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get a single user by ID
- `PUT /api/v1/users/update/:id` - Update a user by ID
- `DELETE /api/v1/users/delete/:id` - Delete a user by ID

### Posts

- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get a single post by ID
- `POST /api/v1/posts/create` - Create a new post
- `PUT /api/v1/posts/update/:id` - Update a post by ID
- `DELETE /api/v1/posts/delete/:id` - Delete a post by ID

## Testing

Tests cana be run with `npm test`

## Contributing

Contributions are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch with your changes: `git checkout -b my-feature-branch`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin my-feature-branch`
5. Create a new pull request and describe your changes.
