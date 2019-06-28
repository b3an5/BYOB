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

app.get("/", (request, response) => {
  response.status(200).json("hello world");
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

app.get("/api/v1/heroes/:id", (request, response) => {
  database("heroes")
    .where("id", request.params.id)
    .select()
    .then(hero => {
      if (hero.length) {
        response.status(200).json(hero);
      } else {
        response.statusCode(404).json({
          error: `cound not find paper with id: ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/people/:id", (request, response) => {
  database("people")
    .where("id", request.params.id)
    .select()
    .then(people => {
      if (people.length) {
        response.status(200).json(people);
      } else {
        response.statusCode(404).json({
          error: `cound not find paper with id: ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/heroes", (request, response) => {
  const { name, universe, location } = request.body;
  const hero = request.body;

  if (!name || !universe || !location) {
    return response
      .status(422)
      .json("please provide a name, universe and location for hero");
  } else {
    database("heroes")
      .insert(hero, "id")
      .then(hero => {
        response.status(201).json({ id: hero[0] });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  }
});

app.post("/api/v1/people", (request, response) => {
  const { name, hero_id } = request.body;
  const person = request.body;

  if (!name || !hero_id) {
    return response
      .status(422)
      .json("please provide a name and the coresponding hero id");
  } else {
    database("people")
      .insert(person, "id")
      .then(person => {
        response.status(201).json({ id: person[0] });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  }
});

app.delete("/api/v1/heroes/:id", (request, response) => {
  const id = parseInt(request.params.id);
});
