const express = require("express");
const data = require("./data.json");
const cors = require("cors");

const app = express();
const port = 4000;

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  const test = req.get("X-Auth-Token");
  if (!test || test !== process.env.AUTH_TOKEN) {
    res.status(403).end();
  }
  next();
});

app.get("/countries", (req, res) => {
  const { prefix } = req.query;

  if (!prefix) {
    res.send(data);
  } else {
    const filteredCountries = data.filter((country) => {
      const data = country.country.includes(prefix);
      return data;
    });

    res.send(filteredCountries);
  }
});

app.get("/country/:id", (req, res) => {
  const { id } = req.params;

  const capitaliseId = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };
  const finalId = capitaliseId(id);

  const filteredCountries = data.filter((country) => {
    const data = country.country.includes(finalId);
    return data;
  });

  res.send(filteredCountries);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
