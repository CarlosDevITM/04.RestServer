const express = require("express");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    //Rutas
    this.routes();
    //Middlewares
    this.middlewares();
    this.app.use(cors());
  }

  middlewares() {
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello Get");
    });

    this.app.post("/", (req, res) => {
      res.send("Hello Post");
    });

    this.app.put("/", (req, res) => {
      res.send("Hello Put");
    });

    this.app.patch("/", (req, res) => {
      res.send("Hello Patch");
    });

    this.app.delete("/", (req, res) => {
      res.send("Hello Delete");
    });
  }

  listener() {
    this.app.listen(this.port, () =>
      console.log(`Express server listening on ${this.port}`)
    );
  }
}

module.exports = Server;
