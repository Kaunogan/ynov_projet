<p align="center">
  <a href="https://example.com/">
    <img src="https://pbs.twimg.com/profile_images/979714483387092994/PMI-aUXp_400x400.jpg" alt="Logo" width=85 height=85>
  </a>

  <h3 align="center">Ynov - B3 Info - GUMBAU Elric | LEMOINE Kaunogan</h3>
</p>

## B3 Devops - TP 2

- [About us](#About-us)
- [About this project](#About-this-project)
- [Prerequisites](#Prerequisites)
- [What's included](#whats-included)
- [Which language used](#Which-language-used)
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
   |         Docker         |      
   |         Node.js        |   

    > Ask google how to install these tools if you don't have them 😉

## What's included

```text
ynov-projet/
└── img/
    └── modele-bdd-projet.png
└── README.md
```

## Which language used

- Framework : Electron

   |     Languages     |         
   | ----------------- |
   |        HTML       |      
   |        CSS        | 
   |        JS         | 


## How it works

- THE REST API

    Make the link with the BDD via an ORM (the ORM can even create the BDD).
    Provide HTTP routes for all CRUD actions from all tables of the data model.
    Provide (in an HTTP route or more) all the relative information, the composition of the data model (like an MCD but in JSON)

- The GUI

    Provide pages for all CRUD actions from all tables in the
    data model (Ex: per table, one list / delete page and one page addition / modification).
    The GUI must use the same page for a CRUD action, regardless of the table.
    The page should be built on its own based on information from composition of the model provided by the API.
    To do this, it will be necessary to create generic components for each type of

## Docs

Docker              : https://docs.docker.com/

Dockerfile          : https://docs.docker.com/engine/reference/builder/

Docker compose      : https://docs.docker.com/compose/

Docker compose up   : https://docs.docker.com/compose/reference/up/

Docker compose down : https://docs.docker.com/compose/reference/down/

Alpine              : https://alpinelinux.org/

Node.js             : https://nodejs.org/en/


Enjoy ! 😉