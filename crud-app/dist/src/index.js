"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database = require("./data/database.json");
const app = express_1.default();
app.use(morgan_1.default("tiny"));
const port = 3000;
app.get("/api/organizations", (req, res) => {
    res.send(database);
});
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map