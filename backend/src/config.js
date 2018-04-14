import path from "path";
// inject process.env variables from secret.env (not committed to github);
require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", "..", "../secret.env")
});

export const config = {
  PORT: process.env.PORT || "8080"
};

export default config;
