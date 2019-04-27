# Description 

Sandbox to experiment with Serverless framework. Currently set to use serverless-http so an Express app/ function can be wrapped and used with any serverless provider (currently AWS).

# Installation

- npm install
- serverless deploy -v

# Teardown

- serverless remove

# Use

- EXAMPLE ENDPOINT: https://buceh2uvmj.execute-api.us-east-1.amazonaws.com/dev/?input=4gal
- [serverless deploy function -f hello] (can be used to quick deploy individual functions)
- [serverless invoke -f hello -l] (invoke individual function)
- serverless logs -f app -t (log stream of function named "app")

# Misc

- https://serverless.com/framework/docs/providers/aws/guide/quick-start/
- https://serverless.com/framework/docs/providers/aws/events/apigateway/#example-lambda-proxy-event-default
- AWS "internal server error" was fixed by installing npm packages
- Path in index file has to match [GET] path in YML
- handler: index.handler in YML refers to "module.exports.handler = serverless(app)" in index.js, where "app" is the name of the function (also referred to in the YML)