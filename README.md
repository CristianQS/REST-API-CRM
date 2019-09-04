# REST-API CRM

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

__IMPORTANT__

The __maximum size__ of the request for this project is the __2MB__. You can configure in the *configs* folder


## Users

To manage users you need to be authenticated as a ADMIN user. If you try to authenticate as a BASIC user, you will receive a *UNAUTHORIZED message*.

The next table show you all the endpoints you can request.

Endpoint |  Description
--- | :---
GET    /v1/users |  Get all users
POST   /v1/users | Create a new user
PUT    /v1/users/:id | Modify a user
PATCH  /v1/users/:id/role |  Change the role of a user
DELETE /v1/users/:id |  Delete a user


These are the default users:

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
#### Role
***
Users can have two types of roles, a **Basic** or **Admin**. To update or create a user, have in mind that, these are the values to establish each role. 

###### BASIC USER

```json
  {
    "role": "BASIC"
  }
```
###### ADMIN USER
```json
  {
    "role": "ADMIN"
  }
```

#### GET /v1/users
****
You will get a list with all the users.

```
GET http://domain.com/v1/users/
```

#### POST /v1/users
****
You can create a new User.

```
POST http://domain.com/v1/users/
```

The __username, password, email__ and __role__ are __required__ fields.

An example of the JSON could be the next one:

```json
  {
    "username": "Dick Grayson",
    "password": "night",
    "email": "grayson@gmail.com",
    "role": "BASIC"
  }
```

#### PUT /v1/users/:id
****
You can update the __username, password__ and __email__ of a user

```
PUT http://domain.com/v1/users/${userId}
```
You must send as a __param__ the __id__ of the user.

The __username, password__ and __email__ can't not be an empty string. You can't send the role field, due to we have another endpoint to do that operation.

An example of the JSON could be the next ones:

```json
  {
    "username": "Damian Grayson",
    "password": "sun",
    "email": "gon@gmail.com"
  }
````
```json
  {
    "password": "sun",
    "email": "gon@gmail.com"
  }
```
```json
  {
    "email": "gon@gmail.com"
  }
```

#### PATCH /v1/users/:id/role
****
In this endpoint you can update the role of an user. 

```
PATCH http://domain.com/v1/users/${userId}/role
```

You must send as a __param__ the __id__ of the user.

You have to send on the body a JSON with the role field. If you send other fields or the value of the Role does not exists, the request will fail.

An example of the JSON could be the next one:

##### CHANGE TO A BASIC USER

```json
  {
    "role": "BASIC"
  }
```
##### CHANGE TO AN ADMIN USER
```json
  {
    "role": "ADMIN"
  }
```

#### DELETE /v1/users/:id
****
You can a delete a user.

```
DELETE http://domain.com/v1/users/${userId}
```

You must send as a __param__ the __id__ of the user.

## Customers

To manage customers you need to be authenticated as a BASIC or ADMIN user.

The next table show you all the endpoints you can request.

Endpoint |  Description
--- | ---
GET /v1/customers |  Get all customers
GET /v1/customers/:id |  Get a customer
POST /v1/customers | Create a new customer
PUT /v1/customers/:id | Modify a customer
DELETE /v1/customers/:id |  Delete a customer

These are the default customers:

```json
  {
    "name": "Oswold",
    "surname": "Cobblepot",
    "email": "penguin@gmail.com",
    "photo" : "https://crm-api-photo.s3-eu-west-1.amazonaws.com/penguin%40gmail.com.jpg"

  },
  {
    "name": "Harvy",
    "surname": "Dent",
    "email": "dent@gmail.com",
    "photo" : "https://crm-api-photo.s3-eu-west-1.amazonaws.com/dent%40gmail.com.jpg"
  }
```

### PHOTO

__IMPORTANT__

Customer can have a photo. If you want to __upload a photo__, you have to send the photo in __Base64__. This photo will be storaged in a S3 Bucket, and then in the database we store in the photo field the __URL__ of this one.

The __maximum size__ to upload a photo is the __1MB__

You can upload a photo when you are creating a customer or when you are updating one.

The endpoints are:

```
POST http://domain.com/v1/customers/

PUT http://domain.com/v1/customers/${customerId}
```
For more details, continue the reading

__IMPORTANT__

I want to emphasize that in the next example we __cut__ a part of the base64 image:

```json
{
  "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACE8AAAhYCAYAAAA9ywWHAAAACXBIWXMAAC4jAAAuIwF4pT92AAAgAElEQVR4nOzdX2xc53kv6rcBE1mA+cfrSA4SWSYdG6mq2JasjaZIbZREeLHRBidSCrQbDVJI++ybhC0g5apAz4Xki10gN5UE7K725hxLaJDitEAtOUiLXqyIKuwaTQCJihPB7ZEj0rYcxNKhKdKAJIeAz8UMLUomhxxyzXxrZp4HICSIw7XeWfN5ZM33W+/7a......."
}

```

__BASE64ENCODER__

[Base64Encode](https://www.base64-image.de)


#### GET /v1/customers
****
You will get a list with all the customers.

```
GET http://domain.com/v1/customers/
```

#### GET /v1/customers/:id
****
You can get the full information a customer.

```
GET http://domain.com/v1/customers/${customerId}
```

You must send as a __param__ the __id__ of the customer.

#### POST /v1/customers
****
You can create a new Customer.

```
POST http://domain.com/v1/customers/
```

The __name,surname__ and __email__ and  are __required__ fields.

__IMPORTANT__
A photo is not required, but you have to send the photo in __Base64__
The __maximum size__ to upload a photo is the __1MB__


An example of the JSON could be the next one:

```json
  {
    "name": "Jonathan",
    "surname": "Crane",
    "email": "crane@gmail.com"
  }
```
```json
  {
    "name": "Jonathan",
    "surname": "Crane",
    "email": "crane@gmail.com",
    "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACE8AAAhYCAYAAAA9ywWHAAAACXBIWXMAAC4jAAAuIwF4pT92AAAgAElEQVR4nOzdX2xc53kv6rcBE1mA+cfrSA4SWSYdG6m..."
  }
```

#### PUT /v1/customers/:id
****

You can update the __username, password__ and __email__ of a customer

```
PUT http://domain.com/v1/customers/${customerId}
```
You must send as a __param__ the __id__ of the customer.

The __name, surname__ and __email__ can't not be an empty string.

__IMPORTANT__
A photo is not required, but you have to send the photo in __Base64__
The __maximum size__ to upload a photo is the __1MB__


An example of the JSON could be the next ones:

```json
  {
    "name": "Jonathan",
    "surname": "Crane",
    "email": "crane@gmail.com"
  }
````
```json
  {
    "name": "Jonathan",
    "surname": "Crane",
  }
```
```json
  {
    "photo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACE8AAAhYCAYAAAA9ywWHAAAACXBIWXMAAC4jAAAuIwF4pT92AAAgAElEQVR4nOzdX2xc53kv6rcBE1mA+cfrSA4SWSYdG6m..."
  }
```

#### DELETE /v1/customers/:id
****
You can a delete a customer.

```
DELETE http://domain.com/v1/customers/${customerId}
```

You must send as a __param__ the __id__ of the customer.