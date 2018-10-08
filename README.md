# Insecurity form

Insecurity forum is a school assignment where the end goal is creating a working and secure forum.

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
Start your mongodb server and set the right config values in `app/config.ts`
Once this is done you can run `npm run serve` to run the node process.
Before doing any changes make sure the version you are using is working by running `npm test`
Once this is done you can safely continue the development.


## Running the tests

To run the test you can install ava globally by running `npm install -g ava`
and run the test suite by typing `ava` in the terminal window, or simply running `npm test`

The server should **NOT** be running while you are running tests. This can result in a listen EADDRINUSE error as the port is already occupied by the running process.

### Development

To ensure good code practice tests should be written before any code.
Any code submitted to the project should be set as a pull request.
and can be safely merged once the test's have passed.


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
* Morten Omholt-Jensen - *Initial work and development* - [Mortenoj](https://github.com/mortenoj)
* Jørgen Hanssen - *Initial work and development* - [Hanssen97](https://github.com/hanssen97)

## License

This software is protected by the MIT license, see `LICENSE.md` for more information
