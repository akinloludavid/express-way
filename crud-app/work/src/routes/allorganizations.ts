import express from "express";

const router = express.Router();
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
  newLength: database.length - 1,
  removed: `id${req.params.id}`,
 });
});

export default router;
