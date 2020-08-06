"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appController_1 = __importDefault(require("../controller/appController"));
const config = require('./../../config/config');
const jwt = require("jsonwebtoken");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/", this.seguridad, appController_1.default.index);
        this.router.post("/", this.seguridad, appController_1.default.json);
        this.router.get("/getData", this.seguridad, appController_1.default.getData);
        this.router.post("/postData", this.seguridad, appController_1.default.postData);
        this.router.delete("/deleteData/:id", this.seguridad, appController_1.default.deleteData);
        this.router.put("/updateData/:id", this.seguridad, appController_1.default.updateData);
        this.router.post("/login", appController_1.default.autenticar);
    }
    seguridad(req, res, next) {
        let bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            jwt.verify(bearerHeader, config.llave, (err, data) => {
                if (err) {
                    res.status(403).json({ err: err });
                }
                else {
                    let dataId = data['id'];
                    res.locals.post = dataId;
                    next();
                    return;
                }
            });
        }
        else {
            res.status(403).json({ log: "No existe el token de sesión." });
        }
    }
}
const appRoutes = new GamesRoutes();
exports.default = appRoutes.router;
