# Problem
Build a simple interactive UI to display a list of an arbitrary user-specified organization's GitHub projects ranked by any meaningful metric you'd like, and allow the user to browse recent commits on that project. 

For instance, one metric could be popularity, which could be derived via the number of forks. In this case, the UI would list Netflix's public repositories with Hystrix on top, followed by SimianArmy, followed by eureka, etc. GitHub offers an intuitive RESTful API to do this.

# To Install Application
### Install node
https://nodejs.org/en/
### Install yarn
npm install -g yarn
### Install application dependencies
yarn install

# To Run Application
yarn start

# To Test Application
yarn test --watchAll

## Things to add in the future
- Handle rate limiting errors
- Add infinite load pagination
- Add routing to allow for copy and pasting repo searches

