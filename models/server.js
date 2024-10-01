const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { createServer } = require("http");

//Mongoose
const { dbConnection } = require("../database/connection.js");
const { socketController } = require("../sockets/socketController.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = createServer(this.app);

    this.io = require("socket.io")(this.server);

    //PATHS
    this.paths = {
      users: "/api/users",
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      upload: "/api/upload",
    };

    //MONGO CONNECTION
    this.mongoDBConnection();

    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();

    //Sockets
    this.sockets();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y posteo del body
    this.app.use(express.json());
    //Static pages folder
    this.app.use(express.static("public"));
    //File uploads
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        //FOLDERS
        createParentPath: true,
      })
    );
  }

  //MongoDB connection function
  async mongoDBConnection() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/authRoutes.js"));

    this.app.use(this.paths.users, require("../routes/userRoutes.js"));

    this.app.use(
      this.paths.categories,
      require("../routes/categoriesRoutes.js")
    );
    this.app.use(this.paths.products, require("../routes/productsRoutes.js"));

    this.app.use(this.paths.search, require("../routes/searchRoutes.js"));

    this.app.use(this.paths.upload, require("../routes/uploadsRoutes.js"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }
  listener() {
    this.server.listen(this.port, () =>
      console.log(`Express server listening on ${this.port}`)
    );
  }
}

module.exports = Server;
