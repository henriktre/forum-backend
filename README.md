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

Before starting the dockerized process you need to run `npm run build` which builds the target application.
To run the application make sure you have `docker` and `docker-compose ` installed. You can not run the application by running the `docker-compose up` command.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Glasier/Octane-Server/tags).

## Authors

* **Bjarte Klyve Larsen** - *Initial work and development* - [Klyve](https://github.com/klyve)
* Morten Omholt-Jensen - *Initial work and development* - [Mortenoj](https://github.com/mortenoj)
* Jørgen Hanssen - *Initial work and development* - [Hanssen97](https://github.com/hanssen97)

## License

This software is protected by the MIT license, see `LICENSE.md` for more information
