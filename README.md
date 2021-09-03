local development:

1. Clone https://github.com/gpbaculio/learning-serverless-relay.git and cd learning-serverless-relay

2. npm i on root dir "./"
3. cd on server "./server", npm i and npm run buildSchema for front-end
4. cd on reddit-top "./reddit-top" and npm i, generate relay by npm run relay
5. to start app, cd on root "./" npm run dev

to deploy:

1. on frontend dir "./reddit-top" "npm run build"
2. setup account with https://github.com/serverless-components/express
3. cd backend dir "./server" and run on cmd "serverless dev" for dev env

NOTE:
change GRAPHQL_URL on ./reddit-top/src/environment.ts base on ur result

testing:

1. cd server and npm run test
2. cd reddit-top and npm run test
