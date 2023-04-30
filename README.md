This microservice/API interacts with the GitHub API to find images in the body of GitHub issues and comments on the issue to notify that an image was detected with the date and time. The service requires authentication with a personal access token and uses BasicAuth to protect all routes except the health check endpoint. Proper error handling is implemented with correct HTTP status codes and helpful messages. The code is structured cleanly with appropriate comments and abstractions as needed. There are four endpoints for the API that include GET requests to retrieve issue information, check if an issue body contains an image, and POST requests to post a comment on an issue and identify images in the GitHub issue body. Tests are written where necessary.


Check it out 
