const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.URL;

const mongooseConnection = async () => {
  mongoose
    .connect(url)
    .then((db) =>
      console.log(`Mongodb is connect mongoose : ${db.connection.host}`)
    )
    .catch((error) => console.log(error));
};

module.exports = mongooseConnection;
