"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database = require("./data/database.json");
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("tiny"));
app.get("/api/organizations", (req, res) => {
    res.send(database);
});
app.get("/api/organizations/:id", (req, res) => {
    const id = req.url.split("/")[3];
    const org = database.find((item) => item.id === parseInt(req.params.id));
    if (!org) {
        res.status(404).send({
            message: `No organization with id ${id} was found`,
        });
    }
    res.send(org);
});
app.post("/api/organizations", (req, res) => {
    let newOrg = {
        id: database.length + 1,
        organization: req.body.organization,
        ceo: req.body.ceo,
        country: req.body.country,
    };
    if (!newOrg.organization || !newOrg.ceo || !newOrg.country) {
        res.status(400).send("Organization, ceo and country must be filled");
        return;
    }
    database.push(newOrg);
    res.send(newOrg);
});
app.put("/api/organizations/:id", (req, res) => {
    const id = req.url.split("/")[3];
    const org = database.find((item) => item.id === parseInt(req.params.id));
    if (!org) {
        res.status(404).send({
            message: `No organization with id ${id} was found`,
        });
    }
    org.organization = req.body.organization;
    org.ceo = req.body.ceo;
    org.country = req.body.country;
    res.send(org);
});
app.delete("/api/organizations/:id", (req, res) => {
    const id = req.url.split("/")[3];
    const org = database.find((item) => item.id === parseInt(req.params.id));
    if (!org) {
        res.status(404).send({
            message: `No organization with id ${id} was found`,
        });
    }
    let idx = database.indexOf(org);
    database.splice(idx, 1);
    res.send({
        newLength: database.length - 1,
        removed: `id${req.params.id}`,
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server fired at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map