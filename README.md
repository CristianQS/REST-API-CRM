# REST-API CRM
--------------

## Table of Contents

1. [Introduction](#Introduction)
2. [Setup](#Setup)
3. [Authentication](#Authentication)
4. [Headers](#Headers)
5. [Users](#Users)
6. [Customers](#Customers)

## Introduction

This project has been developed a REST API to manage *customer* data for a small shop. This ones are managed by *users*. Also we distinct two types of users:

* Admin *(Can manage Users and Customers)*
* Basic *(Can manage Customers)*

On the following sections we will see their actions in more detail.

## Setup

Before we explain you how to use this API, we will introduce you how to run a docker container that contains our Database. It use a mongoDB image.

### Prerequisites

To run the project you need to have installed. 

* Node.js
* Docker

### Docker

First at all you have to go to the following path of the project _'resources/docker'_** and execute the commands that appears below.

```
  docker-compose build
  docker-compose up -d
```

Once you executed this commands, you will have a container that it's running a mongoDB. If you want to __stop__ and __remove__ this container, you can go the path that we mention before (_'resources/docker'_**) and execute the following command.

```
  docker-compose down
```

Also you can execute this commands to stop the container. 

```
  docker stop db_1
  docker rm db_1
```
Each time that we create the container, we seed the db with some users and customers. Remember that you have to __remove the container__ if you want this behavior. Otherwise __it doesn't seed__. 

### Node

To run the REST API in __local__ you must to have the *mongoDB container running*,otherwise the REST API will fail.

To run the app on local you can use this commands.

```
  npm run start
  npm run watch
```

To run the *test* you have two modes
```
  npm run test
  npm run test:watch
```

## Authentication

Once the API is running, you can start to make request to the endpoints. However, you need to be __authenticated__ to use it. 

If you want to be __authenticated__ you need to call the next endpoint
```
POST http://domain.com/v1/auth/
```
Also you have to send a JSON with the email and the passsword as we show below:

#### ADMIN USER
```json
  {
    "email": "bruce@gmail.com",
    "password": "Batman"
  }
```
#### BASIC USER
```json
  {
    "email": "jason@gmail.com",
    "password": "redHood"
  }
```
If the Authentication was successfull, the endpoint will send you a __Token__, this token has an __expires time__ of __1 hour__.

## Headers

When you obtain your token, you have to __add it in the header__. This allows you to make some request to the API endpoints. It has to look like this

```
Authorization : Bearer ${your token}
```

If you are using Postman, go to the Authorization Tab --> Select the type of Authorization --> Bearer Token --> Insert the token in the Token Field.

It has to seem as the following image

[![Image from Gyazo](https://i.gyazo.com/6a5e185656b756847d85a4c68f3c1023.png)](https://gyazo.com/6a5e185656b756847d85a4c68f3c1023)


## Users

To manage users you need to be authenticates as a ADMIN user

Endpoint |  Description
--- | ---
GET /v1/users |  Get all users
POST /v1/users | Create a new user
PUT /v1/users/:id | Modify a user
PATCH /v1/users/:id/role |  Change the role of a user
DELETE /v1/users/:id |  Delete a user

```json
  {
    "username": "Bruce Wayne",
    "password": "Batman",
    "email": "bruce@gmail.com",
    "role": "ADMIN"
  },
  {
    "username": "Jason Todd",
    "password": "redHood",
    "email": "jason@gmail.com",
    "role": "BASIC"
  }
```

## Customers

Endpoint |  Description
--- | ---
GET /v1/customers |  Get all customers
GET /v1/customers/:id |  Get a customer
POST /v1/customers | Create a new customer
PUT /v1/customers/:id | Modify a customer
DELETE /v1/customers/:id |  Delete a customer