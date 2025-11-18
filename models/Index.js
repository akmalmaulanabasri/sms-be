"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
let config = require("../configs/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // If running tests and no dialect provided, default to sqlite in-memory
  if (env === "test") {
    if (!config.dialect) {
      config = Object.assign({}, config, {
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
      });
    }
    // ensure we don't attempt remote DB when using sqlite memory
    if (config.dialect === "sqlite" && !config.storage)
      config.storage = ":memory:";
  }

  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Test DB connection
sequelize
  .authenticate()
  .then(() =>
    console.log(
      "Database connected... to",
      config.database,
      "with env",
      process.env.NODE_ENV,
      "and dialect",
      config.dialect
    )
  )
  .catch((err) => console.error("Error: ", err));

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== "Index.js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
