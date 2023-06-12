const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./config/connectDb");

dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

//check db conn
app.get("/", (req, res) => {
  db.raw("SELECT 1")
    .then(() => {
      res.send("Database connection successful");
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
      res.status(500).send("Failed to connect to the database");
    });
});

app.use("/api", require("./routes/empRoutes"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
