# BYOB - Super-Backend

## Base URL -https://super-backend.herokuapp.com/

## Endpoints

### GET '/api/v1/heroes'
* gives back a list of all superheroes in JSON

``` 
[
{
"id": 12,
"name": "Batman",
"universe": "DC",
"location": "Gotham",
"created_at": "2019-07-01T05:45:54.612Z",
"updated_at": "2019-07-01T05:45:54.612Z"
},
{
"id": 13,
"name": "Spiderman",
"universe": "Marvel",
"location": "NYC",
"created_at": "2019-07-01T05:45:54.635Z",
"updated_at": "2019-07-01T05:45:54.635Z"
},
{
"id": 14,
"name": "Iron Man",
"universe": "Marvel",
"location": "Malibu",
"created_at": "2019-07-01T05:45:54.647Z",
"updated_at": "2019-07-01T05:45:54.647Z"
}
] 
```

### GET '/api/v1/people'
* gives back a list of all the super hero alter egos in JSON

``` 
[
{
"id": 34,
"name": "Bruice Wayne",
"hero_id": 12,
"created_at": "2019-07-01T05:45:54.672Z",
"updated_at": "2019-07-01T05:45:54.672Z"
},
{
"id": 35,
"name": "Ben Reilly",
"hero_id": 13,
"created_at": "2019-07-01T05:45:54.673Z",
"updated_at": "2019-07-01T05:45:54.673Z"
},
{
"id": 36,
"name": "Peter Parker",
"hero_id": 13,
"created_at": "2019-07-01T05:45:54.672Z",
"updated_at": "2019-07-01T05:45:54.672Z"
}
] 
```

### GET '/api/v1/heroes/:id'
* gives back a specific superhero in JSON

``` 
{
"id": 12,
"name": "Batman",
"universe": "DC",
"location": "Gotham",
"created_at": "2019-07-01T05:45:54.612Z",
"updated_at": "2019-07-01T05:45:54.612Z"
}
```

### GET '/api/v1/people/:id'
* gives back a specific alter ego in JSON

``` 
{
"id": 36,
"name": "Peter Parker",
"hero_id": 13,
"created_at": "2019-07-01T05:45:54.672Z",
"updated_at": "2019-07-01T05:45:54.672Z"
}
```

### POST '/api/v1/heroes'
* Allows user to post new Heroes to the database
#### Required Request body
* name 
* universe 
* location

### POST '/api/v1/people'
* Allows user to post new people to the database
#### Required Request body
* name 
* corresponding hero id


### DELETE '/api/v1/:table/:id'
* Allows user to delete people or heroes from the database
#### URL params
* table names are heroes and people
* corresponding hero or person id 
* people must be deleted before the hero
