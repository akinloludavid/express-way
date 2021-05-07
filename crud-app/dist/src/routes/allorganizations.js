"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const database = require("../data/database.json");
router.get("/", (req, res) => {
    res.send(database);
});
router.get("/:id", (req, res) => {
    const id = req.url.split("/")[3];
    const org = database.find((item) => item.id === parseInt(req.params.id));
    if (!org) {
        res.status(404).send({
            message: `No organization with id ${id} was found`,
        });
    }
    res.send(org);
});
router.post("/", (req, res) => {
    let newOrg = {
        id: database.length + 1,
        organization: req.body.organization,
        ceo: req.body.ceo,
        country: req.body.country,
        createdAt: new Date(),
        products: req.body.products,
        marketValue: req.body.marketValue,
        address: req.body.address,
        noOfEmployees: req.body.noOfEmployees,
        employees: req.body.employees,
    };
    if (!newOrg.organization || !newOrg.ceo || !newOrg.country) {
        res.status(400).send("Organization, ceo and country must be filled");
        return;
    }
    database.push(newOrg);
    res.send(newOrg);
});
router.put("/:id", (req, res) => {
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
    org.updatedAt = new Date();
    org.products = req.body.products;
    org.marketValue = req.body.marketValue;
    org.address = req.body.address;
    org.noOfEmployees = req.body.noOfEmployees;
    org.employees = req.body.employees;
    res.send(org);
});
router.delete("/:id", (req, res) => {
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
        removed: `id${req.params.id}`,
    });
});
exports.default = router;
//# sourceMappingURL=allorganizations.js.map