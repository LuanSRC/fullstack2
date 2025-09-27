const carsRoutes = require("./src/routes/carsRoutes.js");
const usersRoutes = require("./src/routes/usersRoutes.js");
const db = require("./src/database/db.js");
const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

db.sync();

app.use("", carsRoutes);
app.use("", usersRoutes);

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
