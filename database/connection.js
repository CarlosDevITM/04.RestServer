const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to connect to Mongo");
  }
};
dbConnection();

module.exports = {
  dbConnection,
};
