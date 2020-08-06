import { Router } from "express";
import appController from "../controller/appController";
const config = require('./../../config/config');
const jwt = require("jsonwebtoken");
class GamesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }
  config(): void {
    //this.router.[get | post | put | delete]
    this.router.get("/",this.seguridad ,appController.index);
    this.router.post("/",this.seguridad, appController.json);
    this.router.get("/getData",this.seguridad, appController.getData);
    this.router.post("/postData",this.seguridad, appController.postData);
    this.router.delete("/deleteData/:id",this.seguridad, appController.deleteData);
    this.router.put("/updateData/:id",this.seguridad, appController.updateData);
    this.router.post("/login", appController.autenticar);
  }

  seguridad(req: any, res: any, next: any): void {
    let bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      jwt.verify(bearerHeader, config.llave, (err: any, data: any) => {
        if (err) {
          res.status(403).json({ err: err })
        } else {
          let dataId = data['id'];
          res.locals.post = dataId;
          next();
          return;
        }
      });
    } else {
      res.status(403).json({ log: "No existe el token de sesión." });
    }
  }
}
const appRoutes = new GamesRoutes();
export default appRoutes.router;