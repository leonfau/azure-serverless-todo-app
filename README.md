# Todo App
Sample Todo App to demonstrate how to implement a serverless app on azure.

This app is part of an article which describes how to run a completely serverless application on azure. 
The article is splitted into different parts:
1. [Journey to a Serverless Application on Azure](https://leon-fausten.medium.com/journey-to-a-serverless-application-in-azure-254eaf5afc15)
1. [Serverless Backend with Azure Functions and Cosmos DB](https://leon-fausten.medium.com/serverless-backend-with-azure-functions-and-cosmos-db-997a09df83d9)

## Infrastructure 
Infrastructure is described via terraform scripts. 
To run it on you infrastructure you may have to adapt it to use unique names and a different backend to persist the terraform state.

## Backend
Azure Function App in NodeJs.
