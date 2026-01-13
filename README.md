# Statina ui - Frontend for https://statina.scilifelab.se/
### Prod frontend app: https://statina-83aa9.web.app/
### Staging frontend app: https://statina-stage.web.app/

## About

This app is built with [Vite](https://vitejs.dev/)

Before running the app you need to install:
- [Node](https://nodejs.org/) 
- [Yarn](https://yarnpkg.com/)

## Available Scripts

Once cloned the repo, install dependencies with:

### `yarn install`

To run the app three environment variables are needed:

- `VITE_BACKEND_URL` URL of the API endpoints for Statina.

To run:
### `VITE_BACKEND_URL="the-backend-url-here" yarn dev`
example: `VITE_BACKEND_URL="http://localhost:28003" yarn dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in watch mode.<br />

### `yarn coverage`
run tests with coverage

### `yarn lint`
will display linting issues.

### `yarn lint --fix`

will fix the errors.

### `npx stylelint "**/*.css"`
will display style lint issues.

### `npx stylelint "**/*.css" --fix`

will fix the errors.



### `VITE_BACKEND_URL="the-backend-url-here" yarn build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

The app is deployed to a preview channel at every pull request and at every merge to master to staging and production
