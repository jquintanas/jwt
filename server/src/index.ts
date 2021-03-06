import express, {Application} from "express";
import morgan from "morgan";
const bodyParser =  require("body-parser");
const path = require("path");
import cors from "cors";
import appRouter from "./route/appRouter";
class Server {
  public app:Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();  }

  config():void {
    this.app.set("port", process.env.PORT || 3000);
    //static files
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  

  router():void {
    this.app.use("/",appRouter);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();