import knex from "knex";
import config from "../config";
const { PG_CONNECTION_STRING } = config;

class Connection {
  constructor() {
    if (!PG_CONNECTION_STRING) {
      throw new Error("Postgres connection string not found");
    }
    this.knex = knex({
      client: "pg",
      debug: true,
      connection: PG_CONNECTION_STRING
    });
    this.tableCreated = false;
  }
  up() {
    if (!this.tableCreated) {
      return new Promise((resolve, reject) => {
        return this.knex.schema
          .hasTable("vehicle_details")
          .then(exists => {
            if (!exists) {
              return this.knex.schema.createTable(
                "vehicle_details",
                vehicleDetails => {
                  vehicleDetails.increments();
                  vehicleDetails.string("vin").unique();
                  vehicleDetails.integer("view_count");
                }
              );
            }
          })
          .then(() => {
            this.tableCreated = true;
            resolve();
          })
          .catch(err => reject(this.logError(err)));
      });
    } else {
      console.warn("Table 'vehicle_details' has already been created");
      return;
    }
  }
  down() {
    if (this.tableCreated) {
      return this.knex
        .dropTableIfExists("vehicle_details")
        .then(() => {
          this.tableCreated = false;
        })
        .catch(err => this.logError(err));
    } else {
      console.warn("Table 'vehicle_details' does not exist");
      return;
    }
  }
  addCar(vin) {
    return this.knex("vehicle_details")
      .select()
      .where({ vin })
      .then(rows => {
        if (rows.length === 0) {
          return knex("vehicle_details").insert({ vin, view_count: 0 });
        } else {
          return null;
        }
      })
      .catch(err => this.logError(err));
  }
  incrementCount(vin) {
    return this.knex("vehicle_details")
      .where({ vin })
      .increment("view_count", 1)
      .returning("view_count")
      .catch(err => this.logError(err));
  }

  logError(err) {
    // we can add rollbar support here if we want.
    return console.error(err);
  }
}

export default Connection;
