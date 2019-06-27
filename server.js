const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`app is running on port: ${port}`);
});

app.get("/api/v1/heroes", (request, response) => {
  database("heroes")
    .select()
    .then(heroes => {
      response.status(200).json(heroes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/people", (request, response) => {
  database("people")
    .select()
    .then(people => {
      response.status(200).json(people);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
