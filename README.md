# BE-John

# Hacker News API

Hacker News API is 


# Link to Hosted [demo](https://iwhistler.herokuapp.com)

## To run the API  ##
first clone this repo to your machine

 ``` git clone git@github.com:Omulosi/iReporter.git ```

then change the directory to the project directory

``` cd iReporter ```

then move to the develop branch
    ``` git checkout develop ```


* install dependencies

    ``` npm install```

# running the app locally
create `.env` file and add the following environment variables

``` DB_ENV=development```

``` DB_URL=postgres://<user>:<password>@localhost:5432/<db-name>```

Ensure you have postresql installed

Create a database using postresql and fill the `DB_URL` above with appropriate values.

Create the database tablesa and seed them with some initial data

```npx knex migrate:latest```

```npx seed:run```

Run the application

``` npm run server ```

Use a tool such as **POstman**, or **Insomnia** or **curl** to interact with the API.

# Authentication

To use the API, you have to be signed up and/or logged in. The API uses [JWT](https://jwt.io/) tokens to secure endpoints.

To register, use the following endpoint

    `<host>/api/auth/register`

host, here, can either be the **localhost**`(127.0.0.1)`, if you are running the app locally or the [heroku root](https://iwhistler.herokuapp.com) where the API is hosted.

you will be required to supply your username and password.

```
{
	username: <username>,
	password: <password>	
}
```

To obtain the tokens use the following endpoint

        `<host>/api/v2/auth/login`

the response is a json formatted output containing a **token** that will be used for authentication.

After authentication, use the token to access all the protected endpoints by providing the token in the
**authorization** header of a  request object.

# Testing the API endpoints

the project implements the following endpoints

|Method | API Endpoint | Description|
|-------|--------------|------------|
|GET | /stories | Displays a list of all stories|
|POST | /stories | Creates a new story|
|GET | /stories/<id> | Display one story|
|DELETE | /stories/<id>| Deletes a story|
|PUT | /stories/<id>| Edits a story|
|GET | /stories/<id>/comments| Displays all comments for a story|
|POST | /stories/<id>/comments| Adds a comment to a story|
|GET | /stories/<id>/comments/<id> | Displays a story's comment|
|DELETE | /stories/<id>/comments/<id>| Deletes a story's comment|
|PUT | /stories/<id>/comments/<id>| Edits a story's  comment|


The endpoints can be tested using **Postman**, **[HTTPie](https://httpie.org/doc)** (a command line http client), or curl or **Insomnia** etc.

## Sample payload for testing

Below is a sample payload you can use to test the stories endpoint.

```
{
  "by" : "dhouston",
  "descendants" : 71,
  "id" : 8863,
  "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
  "score" : 111,
  "time" : 1175714200,
  "title" : "My YC app: Dropbox - Throw away your USB drive",
  "type" : "story",
  "url" : "http://www.getdropbox.com/u/2/screencast.html"
}
```


## Testing Using **Postman**
With the project running locally, use the Postman service to test the endpoints by prepending each endpoint in the table above to the base url `http://127.0.0.1:5000/api/`.

For endpoints that require user/client input, Postman provides an easy to use graphical interface for supplying the values as key-value pairs in a header and adding JSON data. It also has an easy to use authentication field where the token can pasted into before a request is made.


# Documentation

View the documentation [here](https://github.com/Build-Week-HN/BE-John)
