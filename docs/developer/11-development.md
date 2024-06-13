# Development

First, run the following command to install dependencies:

```sh
make install
```

Then, starts the development environment by running:

```sh
make run-dev
```

This will initialize the docker containers which can take some time.
When done, three containers will be running:

- `lodex_mongo_1`: the mongo server
- `lodex_server_1`: the API server (node process) running at `http://localhost:3000`
- `lodex_devserver_1`: the webpack server for the frontend running at `http://localhost:8080`

The default username and password are specified in the `./config.json` file along with default `naan` and `subpublisher` for ARK generation.

To access the mongo shell, run:

```sh
make mongo-shell
```
### New package installation

To prevent polluting `package-lock.json`, every developer should use the npm in the docker image.

There is a simple way to do that, instead of `npm install package`, use:

```sh
make npm 'install package'
```

### Database reset

During development, you may need to get an application state, where no data is published.

- `make clear-publication`: just clear the published data but keep your uploaded dataset and your model
- `make clear-database`: clear the whole database

## Tests

Ensure you initialized the development environment first.

To execute all tests, run the following command:

```sh
make test
