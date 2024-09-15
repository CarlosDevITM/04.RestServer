const express = require("express");
require("dotenv").config();
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

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
