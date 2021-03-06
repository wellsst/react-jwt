This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

React auth was based on the great work by Kent C Dodds: https://kentcdodds.com/blog/authentication-in-react-applications

## Additions to the base


Deprecated:::
Formik: https://jaredpalmer.com/formik/docs/overview
npm install formik --save
|| 
yarn add formik

Instead changed to:
https://github.com/dockwa/simple-react-validator
npm install simple-react-validator --save

CSS in JS: https://github.com/emotion-js/emotion
npm install --save @emotion/core

npm install --save react-router-dom

npm install react-icons --save (https://www.npmjs.com/package/react-icons)


Axios for HTTP:
npm install axios --save

GraphQL - apollo
yarn add apollo-boost react-apollo graphql apollo-cache apollo-link apollo-link-context apollo-cache-inmemory apollo-cache-inmemory apollo-client
npm i graphql-tag
or npm install <all the above> --save
//apollo-utilities


Moment:

npm install --save moment react-moment

If timezones required (maybe later)
npm install --save moment-timezone


npm install --save react-timeout, used on the you are logged in component to then do a redirect after a time.
because of this I had to: npm install create-react-class --save

Typescript:

yarn add typescript

Upgrade caniuse-lite:
yarn upgrade caniuse-lite browserslist

npm install classnames --save

## To start

For email as a server on windows use mailslurper

cd client
npm start

cd server (gradle)
server:bootRun

Borrowed a lot for auth from: https://github.com/kentcdodds/bookshelf
https://kentcdodds.com/blog/authentication-in-react-applications

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
