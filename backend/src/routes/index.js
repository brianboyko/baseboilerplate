import express from "express";
import basicRoutes from "./basic";

export const routes = app => {
  const apiRoutes = express.Router();
  basicRoutes({ app, apiRoutes });
  app.use("/", apiRoutes);
  return app;
};

export default routes;
