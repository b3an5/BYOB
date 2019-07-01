const express = require("express");
//brings in express
const environment = process.env.NODE_ENV || "development";
// allows us to use dev environment when working or deployed version
const configuration = require("./knexfile")[environment];
// configures knex and uses dev or deployed environment
const database = require("knex")(configuration);
// creates database with config
const app = express();
// creates express app
const PORT = process.env.PORT || 3000;
// uses either local port or deplyed port

app.use(express.json());
// stringifys data

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
//listens for the port and tells user where its running

app.get("/", (request, response) => {
  response.status(200).send("hello world");
});
//base get to have a splash page so it doesnt seem broken when you go to the url

app.get("/api/v1/heroes", (request, response) => {
  //looks for a get request at this url
  database("heroes")
    //uses knex database labeled heroes
    .select()
    //selects that database
    .then(heroes => {
      response.status(200).json(heroes);
      //if all goes well it gives you a status of 200 and your heroes data
    })
    .catch(error => {
      response.status(500).json({ error });
      //sad path
    });
});

app.get("/api/v1/people", (request, response) => {
  //looks for a get request at this url
  database("people")
    //uses knex database labeled people
    .select()
    //selects that database
    .then(people => {
      response.status(200).json(people);
      //if all goes well it gives you a status of 200 and your people data
    })
    .catch(error => {
      response.status(500).json({ error });
      //sad path
    });
});

app.get("/api/v1/heroes/:id", (request, response) => {
  //looks for get at this url with a param for id
  database("heroes")
    //looks in database heroes
    .where("id", request.params.id)
    // finds the id in heroes that matches the url param
    .select()
    //selects the coresponding hero
    .then(hero => {
      if (hero.length) {
        //used hero.length to make sure hero existed
        response.status(200).json(hero);
        //gives response of status 200 and gives you a hero object
      } else {
        response.statusCode(404).json({
          error: `cound not find paper with id: ${request.params.id}`
        });
        //sad path if hero doesnt exist in the database
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  //sad path if anything else goes wrong other than ids not matching
});

app.get("/api/v1/people/:id", (request, response) => {
  //looks for get at this url with a param for id
  database("people")
    //looks in people db
    .where("id", request.params.id)
    // matches ids
    .select()
    // selects
    .then(people => {
      if (people.length) {
        //looks to see if person exists
        response.status(200).json(people);
        //happy path
      } else {
        response.statusCode(404).json({
          error: `cound not find paper with id: ${request.params.id}`
        });
        //ids couldnt match
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
  //catch for server errors
});

app.post("/api/v1/heroes", (request, response) => {
  //listens for post req at this url
  const { name, universe, location } = request.body;
  // destructures each request argument
  const hero = request.body;
  //conglomerates all request body

  if (!name || !universe || !location) {
    //if there is a part of the request missing
    return response
      .status(422)
      .json("please provide a name, universe and location for hero");
    //throw error to tell user what is needed
  } else {
    database("heroes")
      //uses hero db
      .insert(hero, "id")
      //inserts the entire hero given and an id
      .then(hero => {
        response.status(201).json({ id: hero[0] });
        //happy path giving the user back hero with an id
      })
      .catch(error => {
        response.status(500).json({ error });
        //server error sad path
      });
  }
});

app.post("/api/v1/people", (request, response) => {
  const { name, hero_id } = request.body;
  //individual req body arguments using destructuring
  const person = request.body;
  //whole body

  if (!name || !hero_id) {
    return response
      .status(422)
      .json("please provide a name and the coresponding hero id");
    //if one of the arguments needed in the request are missing it gives a 422 error
  } else {
    database("people")
      //selects people db
      .insert(person, "id")
      //inserts the person request obj with an id
      .then(person => {
        response.status(201).json({ id: person[0] });
        //happy path that gives feedback of the new id
      })
      .catch(error => {
        response.status(500).json({ error });
        //server error sad path
      });
  }
});

app.delete("/api/v1/:table/:id", (request, result) => {
  //url with params for table and id
  const { table, id } = request.params;
  //destructured req params from the url

  database(table)
    //looks in either db depending on what was entered into the url
    .where("id", id)
    //matches id in db with url param
    .select()
    //selects that hero or person
    .del()
    //deletes them
    .then(res => {
      if (!res) {
        result.status(404).json(`id of ${id} does not exist in table ${table}`);
        //if there isnt a result throw error
      } else {
        result.status(200).json("Successfully deleted");
        //happy path
      }
    })
    .catch(error => result.status(500).json({ error }));
  //server error sad path
});
