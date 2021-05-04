"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const allorganizations_1 = __importDefault(require("./routes/allorganizations"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("tiny"));
app.use('/', express_1.default.static(path_1.default.join(__dirname, "views/")));
app.use("/api/organizations", allorganizations_1.default);
app.get('/', (req, res) => {
    res.render('index.html');
});
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server fired at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map