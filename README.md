# baseboilerplate
Brian's base JS boilerplate dev environment

# setup

* Create a secret.env file in the parent directory of this repository. This file should not be part of the application.  

```
AUTOLIST_API_KEY={api key}
PORT=8080
PG_CONNECTION_STRING=postgres://postgres:postgres@127.0.0.1:5432/autolist
```

* Install or configure a local Postgres database on port 5432, and add a database (perhaps using pgAdmin or command line tools) called "autolist" under the postgres user.

*  
