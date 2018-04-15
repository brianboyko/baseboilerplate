import express from "express";
import basicRoutes from "./basic";

export const routes = (app, db) => {
  const apiRoutes = express.Router();
  basicRoutes(apiRoutes, db);
  app.use("/", apiRoutes);
  return app;
};

export default routes;
