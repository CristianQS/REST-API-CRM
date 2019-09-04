# REST-API CRM
--------------

## Table of Contents

1. [Introduction](#Introduction)
2. [Setup](#Setup)
3. [Users](#Users)
4. [Customers](#Customers)

## Introduction

This project has been developed a REST API to manage *customer* data for a small shop. This ones are managed by *users*. Also we distinct two types of users:

* Admin *(Can manage Users and Customers)*
* Basic *(Can manage Customers)*

On the following sections we will see their actions in more detail

## Setup

Before we explain you how to use this API, we will introduce you how to run a docker container that contains our Database. It use a mongoDB image.

### Prerequisites

To run the project you need to have installed 

* Node.js
* Docker

### Docker

First at all you have to go to the following path of the project _'resources/docker'_** and execute the commands that appears below

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
Each time that we create the container, we seed the db with some users and customers. Remember that you have to __remove the container__ if you want this behavior. Otherwise __it doesn't seed__ 

### Node

To run the REST API in __local__ you must to have the *mongoDB container running*,otherwise the REST API will fail.

To run the app on local you can use this commands

```
  npm run start
  npm run watch
```

To run the *test* you have two modes
```
  npm run test
  npm run test:watch
```
## Users

## Customers