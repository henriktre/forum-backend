# Octane-WebAPI

Octane WebAPI is the beating heart of octane cms. This contains all the backend logic for the content management system.
The goal of this repository is to build an efficient and bug free backend service with 100% test coverage.


## Getting Started

To get started you will need to install the `prerequisites`; and clone the repository.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

These are the things required to run the server

```
Nodejs 7+
npm
mongodb
```

### Installing

To run the backend server on your local machine install everything required.
Then run `sudo mongod` to start your mongodb process.
Once this is done you can run `npm start` to run the node process.
Before doing any changes make sure the version you are using is working by running `npm test`
Once this is done you can safely continue the development.





## Running the tests

To run the test you can install ava globally by running `npm install -g ava`
and run the test suite by typing `ava` in the terminal window, or simply running `npm test`

The server should **NOT** be running while you are running tests. This can result in a listen EADDRINUSE error as the port is already occupied by the running process.


### Documentation

The api documentation can be found under documentation/api and should be up to date with the latest version of the software.
[apidoc](http://apidocjs.com/)

To ensure that the API endpoints are well documented we use `apidoc` You will need to write request and response documentation for all endpoints.
These follow the `apidoc` syntax and needs to be detailed with all error codes and return values.
To generate the documentation website run `npm run doc` this will trigger autogeneration of the documentation website.

Like described below, Notice multiple error messages.
```
/**
 * @api {post} /auth Request Authentication token
 * @apiName Authenticate
 * @apiGroup Authentication
 *
 * @apiParam {String} email Users email adress.
 * @apiParam {String} password Users password.
 *
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {Object} settings  Settings object of the User.
 * @apiSuccess {String} token  Access token to the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "John@doe.com",
 *       "lastname": "Doe",
 *       "firstname": "John",
 *       "token": "ejg2903gj2eigjwdgjepg293gj",
 *       "settings": {
 *         "key": "value"
 *       }
 *     }
 *
 * @apiError AuthenticationFailed The username or password does not match.
 * @apiError MissingInput Username and password is required to sign in.
 *
 * @apiErrorExample Credential missmatch:
 *     HTTP/1.1 403 Not Found
 *     {
 *       "error": "Invalid username or password"
 *     }
 *
 * @apiErrorExample Missing fields:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "error": "Missing fields"
 *     }
 */
```

### Development

To ensure good code practice tests should be written before any code.
Any code submitted to the project should be set as a pull request to the current sprint number.
and can be safely merged once the test's have passed.
At the end of a sprint this branch will be cherry picked and pulled into the next version if it passes the code review.

#### Testing

##### Model tests

```
Every static function in a model should be tested to make sure the expected result is returned
```

##### API Tests

```
Every api endpoint should be tested to make sure they return the right value.
You should make sure that missing parameters do not break the code and
that the right access to run the certain operations are met.
```

##### General tests

```
Every piece of code should be tested this include helper functions and middleware etc.
This is to ensure that there are no software breaking bugs.
```


### And coding style tests

For coding style we follow the `airbnb` js linter style.
You should install eslint with the required tools to make sure your code is following
the right style guide.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Glasier/Octane-Server/tags).

## Authors

* **Bjarte Klyve Larsen** - *Initial work and development* - [Klyve](https://github.com/klyve)

See also the list of [contributors](https://github.com/Glasier/Octane-Server/graphs/contributors) who participated in this project.

## License

This project is **not** licensed under any specific license - see the [LICENSE.md](LICENSE.md) file for details