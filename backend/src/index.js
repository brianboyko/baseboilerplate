import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "./config";
import routes from "./routes/index";
import Connection from "./db/Connection";

const runServer = db => {
  const app = express();
  // cors
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // will eventually be only freety.me
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, x-access-token, x-api-key, X-Access-Token, X-Api-Key, Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    //intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
      //respond with 200
      res.sendStatus(200);
    } else {
      //move on
      next();
    }
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));

  const appWithRoutes = routes(app, db);
  appWithRoutes.listen(config.PORT);
  console.log(`API is listening at http://localhost:${config.PORT}`);
};

const db = new Connection();

db.up().then(() => runServer(db));
