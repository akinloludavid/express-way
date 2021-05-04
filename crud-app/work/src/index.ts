import express from "express";
import morgan from "morgan";
import router from "./routes/allorganizations";
const database = require("./data/database.json");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/organizations", router);

const port = process.env.PORT || 3005;

// app.listen(port, () => {
//  console.log(`Server fired at http://localhost:${port}`);
// });

export default app;
