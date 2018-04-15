import path from "path";
// inject process.env variables from secret.env (not committed to github);
require("dotenv").config({
  path: path.resolve(__dirname, "..", "..", "../secret.env")
});

const config = {
  PORT: process.env.PORT || "8080",
  PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING || "",
  AUTOLIST_API_KEY: process.env.AUTOLIST_API_KEY || "",
  AUTOLIST_API_URL:
    process.env.AUTOLIST_API_URL ||
    "https://qa878qmgjk.execute-api.us-east-1.amazonaws.com/dev"
};

export default config;
