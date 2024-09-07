> **This project is no longer supported and the site is not hosted anymore**

# Figma Component Usage

Simple web app that finds the usages of components in a Figma file. The project uses the [Figma Web API](https://www.figma.com/developers) to read the content of Figma files.

~To see it in action, go to https://handsaw.co.za/figma-component-usage/~

## Getting Started

The project was build using [Angular CLI](https://github.com/angular/angular-cli), and is required to run the project.

Follow the steps below to get started.

### Prerequisites

To run the web app, you will have to install [node.js]( https://nodejs.org/en/), which comes with node package manager. 

You can then install Angular-cli using node package manager
```
npm install -g angular-cli
```

### Setting up authentication
Before starting first add register your application with Figma at [Figma Web API - My Apps](https://www.figma.com/developers/apps)

The default for the website URL and callback is is both
```
http://localhost:9001/
```

After adding your test app, add your client secret and client ID to src/server/index.php

## Running the app
After installing all the prerequisites and , install the dependencies by running
```
npm install
```

Then to run the project, execute
```
ng start
```
This will start two services: a node PHP server that takes care of the authentication with the Figma API and a ndoe server to serve the angular app (which is done through the angular CLI). The two servers are hosted at https://localhost:4002 and https://localhost:9001 respectively.

## Built With

* [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE.md](LICENSE.md) file for details
