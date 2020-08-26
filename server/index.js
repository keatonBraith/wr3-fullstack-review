require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const app = express();

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
const auth = require("./controllers/authController");

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET,
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => console.log(err));

app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);
app.delete("/auth/logout", auth.logout);
app.get("/auth/user", auth.getUser);

app.listen(SERVER_PORT, () =>
  console.log(`Your info is being stolen at port ${SERVER_PORT}.`)
);
