# Database Operations

This repository contains two endpoints:

- `/users` - Retrieves a list of users
- `/posts/:username` - Retrieves a list of posts by username

## Requirements

To run this application, you must have the following installed:

- Docker
- Docker Compose
- Node.js
- npm or yarn

## Getting Started

1. Clone the repository to your local machine.
2. Run the build-and-run script by executing the `build-and-run.sh` file located in the root directory of the repository. On Windows, you can do this by installing Git Bash, opening the repository in Git Bash, and running `./build-and-run.sh`. On macOS, you can run `sh build-and-run.sh` from the Terminal.
3. Next, run `npm i` to install the necessary dependencies.
4. Next, run `npm run start:dev` to start the server.
5. Once the script has finished running, navigate to `http://localhost:3000` to access the application.

### Running `.sh` files on Windows

To run `.sh` files on Windows, you'll need to install Git Bash, which provides a Unix-like environment for running shell scripts. You can download Git Bash from the official website [here](https://git-scm.com/downloads). Once installed, you can open the repository in Git Bash and run the `build-and-run.sh` script by typing `./build-and-run.sh` in the terminal.

### Running `.sh` files on macOS

To run `.sh` files on macOS, you can use the Terminal app. Navigate to the repository in the Terminal and run the `build-and-run.sh` script by typing `sh build-and-run.sh` in the terminal.

## Usage

To use the application, you can use any HTTP client such as Postman or cURL. Below are examples of how to use each of the endpoints.

### `/users`

To retrieve a list of users, send a GET request to `http://localhost:3000/users` with the following optional query parameters:

- `offset` - The number of users to skip before starting to return results (default: 0).
- `limit` - The maximum number of users to return (default: 50).

If successful, the API will respond with a JSON object containing an array of users and metadata about the results:

{
"offset": number,
"limit": number,
"totalPages": number,
"users": [
{
"id": number,
"username": string,
"email": string
},
...
],
"totalCount": number
}

### `/posts/:username`

To retrieve a list of posts by username, send a GET request to `http://localhost:3000/posts/:username`, where `:username` is the username of the user whose posts you want to retrieve.

If successful, the API will respond with a JSON array containing the user's posts:

[
{
"id": number,
"title": string,
"body": string,
"user": {
"id": number,
"username": string,
"email": string
}
},
]

## Postman collection

Note: a postman collection has been provided which can be imported. Called Database Operations.postman_collection.json
