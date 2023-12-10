# Open Jira

The Open Jira project represents a free version of a Jira Platform. This project was build with Next
Js 12 and Mongo DB using Mongo Atlas. You can write new entries, modify and delete it. Each entry
has three status ('pending', 'in-progress', 'finished') and you can change the status doing drag and
drop with card entry. I hope that you like it.

# Getting Started

1. [Environment variables](#enviroment-varibles)
2. [Running project in development](#running-project-in-development)
3. [Deploy](#deploy)

## Environment variables

In the repository, you have the file **.env.example**. This file contains the name of the
environment variables that are used in the different modules.

You must rename this file **.env.example** with the name **.env** and then fill out the environment
variables with their respective values.

```
MONGO_URL='mongodb+srv://<username>:<password>@cluster0.7vfqa1k.mongodb.net/<your-db-name>'

```

### Mongo credentials

For this project, it was done using the Mongo Atlas cluster. In it, you should get the link secret
that allows you to connect to your cluster to establish connections to your database.

You must register in [Mongo Altas](https://www.mongodb.com/es/atlas/database), obtain an account
free and proceed to obtain the necessary credentials.

## Running project in development

Run de comand

```
npm run dev
```

You can see runing the proyect in ` http://localhost:3000`

### Fill the database with test information

Use the endpoint `/api/seed` to put basic information in yor data base.

```
    http://localhost:3000/api/seed
```

## Deploy

See the project deployed in production in vercel try it:
[Open-Jira](https://open-jira-iota.vercel.app/)
