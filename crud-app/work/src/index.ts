import express from "express";
import morgan from "morgan";
import router from "./routes/allorganizations";
import path from "path"
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use('/', express.static(path.join(__dirname, "views/")));
app.use("/api/organizations", router);
app.get('/', (req,res)=>{
  res.render('index.html')
})
const port = process.env.PORT || 3005;

app.listen(port, () => {
 console.log(`Server fired at http://localhost:${port}`);
});

export default app;