1.  Adjust the scraper to handle cases where there are no opinions
2.  Read about restAPI and see if I need to do any server adjustments
3.  Add express to current server, use cors middleware
4.  Host react through static files X
5.  Deployment on heroku

COMMONJS
exports.a = 1
exports.b = 2
exports.c = 3
const { a, b, c } = require('./uppercase.js')

module.exports = value
const value = require('./file.js')

1. create account on mlab, create new database
2. create new db user/admin
3. copy db uri, paste to .env file, gitignore, dotenv
4. install mongoose, connect with db,
5. create Schema for results, register it
6. in route handler function - save results by using Result.insertMany
