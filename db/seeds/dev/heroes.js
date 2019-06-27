let heroesData = [
  {
    name: "Batman",
    universe: "DC",
    location: "Gotham",
    alterEgo: ["Bruice Wayne"]
  },
  {
    name: "Spiderman",
    universe: "Marvel",
    location: "NYC",
    alterEgo: [
      "Peter Parker",
      "Ben Reilly",
      "Miles Morales",
      "Mac Gargan",
      "Mattie Franklin",
      "Ai Apaec"
    ]
  },
  {
    name: "Iron Man",
    universe: "Marvel",
    location: "Malibu",
    alterEgo: ["Tony Stark", "James Rhodes", "Victor von Doom"]
  },
  {
    name: "Thor",
    universe: "Marvel",
    location: "Asgard",
    alterEgo: ["No Alter Ego"]
  },
  {
    name: "Robin",
    universe: "DC",
    location: "Gotham",
    alterEgo: ["Dick Grayson", "Jason Todd"]
  },
  {
    name: "Hulk",
    universe: "Marvel",
    location: "Dayton, Ohio",
    alterEgo: ["Bruce Banner"]
  },
  {
    name: "Captain America",
    universe: "Marvel",
    location: "Queens",
    alterEgo: [
      "Steve Rogers",
      "Isaiah Bradley",
      "William Naslund",
      "Sam Wilson",
      "James Buchanan Barnes",
      "Dave Rickford",
      "John Walker"
    ]
  },
  {
    name: "Ant-Man",
    universe: "Marvel",
    location: "Nebraska",
    alterEgo: ["Hank Pym", "Scott Lang", "Eric O'Grady"]
  },
  {
    name: "Black Panther",
    universe: "Marvel",
    location: "Wakanda",
    alterEgo: ["T'Challa", "Bashenga", "T'Chaka", "Chanda"]
  },
  {
    name: "Wasp",
    universe: "Marvel",
    location: "Nebraska",
    alterEgo: ["Janet Van Dyne", "Nadia van Dyne"]
  },
  {
    name: "Wonder Woman",
    universe: "DC",
    location: "Themyscira",
    alterEgo: ["Princess Diana", "Hippolyta", "Artemis"]
  }
];

const createHero = (knex, hero) => {
  return knex("heroes")
    .insert(
      {
        name: hero.name,
        location: hero.location,
        universe: hero.universe
      },
      "id"
    )
    .then(heroId => {
      let peoplePromises = [];

      hero.alterEgo.forEach(person => {
        peoplePromises.push(
          createPerson(knex, {
            name: person,
            hero_id: heroId[0]
          })
        );
      });

      return Promise.all(peoplePromises);
    });
};

const createPerson = (knex, person) => {
  return knex("people").insert(person);
};

exports.seed = function(knex) {
  return knex("people")
    .del()
    .then(() => knex("heroes").del())
    .then(() => {
      let heroPromises = [];

      heroesData.forEach(hero => {
        heroPromises.push(createHero(knex, hero));
      });
      return Promise.all(heroPromises);
    })
    .catch(error =>
      console.log(`error: ${error};
  }`)
    );

  // return knex("heroes")
  //   .del()
  //   .then(() => {
  //     return Promise.all([
  //       knex("heroes")
  //         .insert(
  //           {
  //             name: "Batman",
  //             universe: "DC",
  //             location: "Gotham"
  //           },
  //           "id"
  //         )
  //         .then(hero => {
  //           return knex("people").insert([
  //             { name: "Bruce Wayne", hero_id: hero[0] }
  //           ]);
  //         })
  //         .then(() => console.log("Seeding complete!"))
  //         .catch(error => console.log(`Error seeding data: ${error}`))
  //     ]);
  //   })
  //   .catch(error => console.log(`Error seeding data: ${error}`));
};
