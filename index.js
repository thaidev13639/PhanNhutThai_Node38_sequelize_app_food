import express from "express";
import cors from "cors";
import rootRoutes from "./src/routes/rootRoutes.js";

const app = express();
const port = 13639;

app.use(express.json());
app.use(cors());
app.use(rootRoutes);

// app.get("/", (req, res) => {
//   res.send("connect BE Success");
// });

app.listen(port, () => {
  console.log("BE Port " + port);
});
