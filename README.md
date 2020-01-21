<p align="center">
  <a href="https://example.com/">
    <img src="https://pbs.twimg.com/profile_images/979714483387092994/PMI-aUXp_400x400.jpg" alt="Logo" width=85 height=85>
  </a>

  <h3 align="center">Ynov - B3 Info - GUMBAU Elric | LEMOINE Kaunogan</h3>
</p>

## ADAPTIVE SOFTWARE | B3 Info

- [About us](#About-us)
- [About this project](#About-this-project)
- [Prerequisites](#Prerequisites)
- [What's included](#whats-included)
- [Which language used](#Which-language-used)
- [Which DB used](#Which-db-used)
- [How it works](#How-it-works)
- [Docs](#Docs)

## About us

About us

### Elric

- elric.gumbau@ynov.com (mail)
- [GUMBAUElric](https://github.com/GUMBAUElric) (github)
- [GUMBAU Elric](https://fr.linkedin.com/in/elric-gumbau-30943417a/) (linkedIn)

### Kaunogan

- kaunogan.lemoine@ynov.com (mail)
- [Kaunogan](https://github.com/Kaunogan) (github)
- [LEMOINE Kaunogan](https://fr.linkedin.com/in/kaunogan-lemoine-7869a6189) (linkedIn)

## About this project


This project contains 3 components: an API, an HMI and a BDD. The goal is to create an HMI
CRUD type which will adapt to any data model
 

## Prerequisites

Here are the prerequisites necessary for this project
     
   |      Prerequisites     |         
   | ---------------------- |
   |        Docker          |      
   |        Node.js         |   
   |        Electron        |   

    > Ask google how to install these tools if you don't have them 😉

## What's included

```text
ynov-projet/
└── img/
    └── model-db.png
└── README.md
```

## Which language used

- Framework : <a href="https://electronjs.org">Electron</a>

   |     Languages     |         
   | ----------------- |
   |        HTML       |      
   |        CSS        | 
   |        JS         | 


## Which DB used

- We use <a href="https://sequelize.org">Sequelize</a> to simplifies database access.
- We use MySQL for the database.


## How it works

- THE REST API

      Make the link with the BDD via an ORM (the ORM can even create the BDD).

      Provide HTTP routes for all CRUD actions from all tables of the data model.

      Provide (in an HTTP route or more) all the relative information
      the composition of the data model (like an MCD but in JSON).

- The GUI

      Provide pages for all CRUD actions from all tables in the
      data model (Ex: per table, one list / delete page and one page addition / modification).

      The GUI must use the same page for a CRUD action, regardless of the table.

      The page should be built on its own based on information from 
      composition of the model provided by the API.

      To do this, it will be necessary to create generic components for each type of.

### ORM Sequelize

- Create the models with the cli

    sequelize model:create --attributes "field:string type:string nom_table:
    string" --name new_field

    sequelize model:create --attributes "id_new_field:integer value:string n
    um_entity:integer" --name value

    sequelize model:create --attributes "id_connect_1:integer id_connect_2:i
    nteger" --name connect 

- Migrate db with cli

    sequelize db:migrate
    
    > this will create our db in mysql with sequelize


## Docs

Docker              : https://docs.docker.com/

Dockerfile          : https://docs.docker.com/engine/reference/builder/

Docker compose      : https://docs.docker.com/compose/

Docker compose up   : https://docs.docker.com/compose/reference/up/

Docker compose down : https://docs.docker.com/compose/reference/down/

Node.js             : https://nodejs.org/en/

Mysql               : https://www.mysql.com/fr/

Enjoy ! 😉