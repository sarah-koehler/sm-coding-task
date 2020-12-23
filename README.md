# SM coding task

This is a coding task for SM

## Getting Started

To build the project **node.js** and **npm** is required (I used node v14.7.0 and npm v6.14.7).

### Installing

GraphQL server: After node and npm are ready, navigate to ```./api``` folder and run:

```
npm install
```

UI: navigate to ```./frontend/src``` folder and run:

```
npm install
```


## Running the project

To start GraphQL server at [http://localhost:4000](http://localhost:4000) from ```./api``` folder run:

```
npm run start
```

To start webpack dev server at [http://localhost:8080](http://localhost:8080) from ```./frontend/src``` folder run:

```
npm run server
```

To build a minified production bundle of the UI from ```./frontend/src``` folder run:

```
npm run build
```

The UI build files are located in ```./frontend/dst``` folder.

IMPORTANT! In case if you are getting "ENOENT" error during the UI build, try to rebuild node-sass (from ```./frontend/src```):

```
node ./node_modules/node-sass/scripts/install.js && npm rebuild node-sass
```

## Running the project's eslint validation check

To run eslint validation check:

```
npm run eslint
```
