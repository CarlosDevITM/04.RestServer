const express = require("express");
require("dotenv").config();
const cors = require("cors");

//Mongoose
const { dbConnection } = require("../database/connection.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.mongoDBConnection();

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y posteo del body
    this.app.use(express.json());
    //Static pages folder
    this.app.use(express.static("public"));
  }

  //MongoDB connection function
  async mongoDBConnection() {
    await dbConnection();
  }

  routes() {
    this.app.use("/api/users", require("./routes/userRoutes.js"));
  }

  listener() {
    this.app.listen(this.port, () =>
      console.log(`Express server listening on ${this.port}`)
    );
  }
}

module.exports = Server;
