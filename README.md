# NC News

NC News is a Node.js Express server using a RESTful API for an online news app.

You can view an online version [here](https://matt-nc-news.herokuapp.com/api)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- **psql** - download [here](https://www.postgresql.org/download/)
- **git** - download [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **node** - download [here](https://nodejs.org/en/download/)

```bash
# EXAMPLES (for Linux):

# To install psql run the following command:
sudo apt update
sudo apt install postgresql postgresql-contrib

# To install git run the following command:
sudo apt install git-all
```

### Installing

A step by step series of examples that tell you how to get a development env running:

1. Clone this repo:

```bash
# Run the following CLI command:
git clone https://github.com/mattleahy/be-nc-news.git
```

2. Install required dependencies:

```bash
# Run the following CLI command:
npm install
```

3. Test setup is working:

```bash
# Setup the database seed with test data:
npm run seed-test

# Run the test suite:
npm test
```

4. Setup the database and seed with data:

```bash
npm run seed-dev
```

5. To run the server locally run the command:

```bash
npm start
```

6. The server will now be able to respond, with an example of the data below.

```json
// EXAMPLE RESPONSE:
// When making a GET request to /api/articles

      "articles": [
        {
          "title": "Seafood substitutions are increasing",
          "topic": "cooking",
          "author": "weegembump",
          "body": "Text from the article..",
          "created_at": 1527695953341
        }
      ]
```

## Running the tests

NC-News comes with a suite of tests designed to check functionality. These include tests for the various endpoints of the server, error handling and util functions used for data handling. The testing scripts are provided for you. Enter the command below to run tests:

```
npm test
```

## Built With

- [Express](https://expressjs.com/) - The framework used
- [Knex](http://knexjs.org/) - SQL Query Builder
- [PostgreSQL](https://www.postgresql.org/) - Database

## Author

- **Matthew Leahy** - [GitHub](https://github.com/mattleahy)
