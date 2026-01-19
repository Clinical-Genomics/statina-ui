# Statina UI - Frontend
Prod app: https://statina.clinicalgenomics.se/
Staging app: https://statina-stage.clinicalgenomics.se/

## About

This app is built with [Vite](https://vitejs.dev/).

Before running the app you need:
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Install
Once cloned, install dependencies:
### `yarn install`

## Environment
- `VITE_BACKEND_URL` URL of the API endpoints for Statina.

## Run locally
### `VITE_BACKEND_URL="the-backend-url-here" yarn dev`
Example: `VITE_BACKEND_URL="http://localhost:12345" yarn dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Tests and lint
### `yarn test`
Launches the test runner in watch mode.

### `yarn lint`
Displays linting issues.

### `yarn lint --fix`
Fixes lint errors.

### `npx stylelint "**/*.css"`
Displays stylelint issues.

### `npx stylelint "**/*.css" --fix`
Fixes stylelint errors.

## Build
### `VITE_BACKEND_URL="the-backend-url-here" yarn build`
Builds the app for production to the `dist` folder. The build is minified and the filenames include hashes.

## Deployments

- Pull requests: GitHub Actions deploys a Firebase Hosting preview channel (not the staging URL).
- Staging: Deploys to the live channel for `statina-stage` only on merge/push to `master`.
- Production: Deploys to the live channel for `statina-83aa9` only on merge/push to `master`.

To find the PR preview URL, open the PR's GitHub Actions run and check the "Deploy to Firebase Hosting on PR" job logs.
