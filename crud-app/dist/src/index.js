"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const allorganizations_1 = __importDefault(require("./routes/allorganizations"));
const database = require("./data/database.json");
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("tiny"));
app.use("/api/organizations", allorganizations_1.default);
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server fired at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map