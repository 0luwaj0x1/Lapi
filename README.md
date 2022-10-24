# Assessment

### Scripts

### `docker run`  

Start the app in a container

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

The app will start on port 5000, it contains only one route /location 

The route take a query param ?postcode, to query the post code.
