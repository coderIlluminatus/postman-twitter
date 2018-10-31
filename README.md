# Assignment 4 - Twitter REST API Backend
## IIIT Allahabad - Sayantan Chatterjee - IIT2015511

## Contents
- [About](#about)
- [Requirements](#requirements)
- [Documentation](#documentation)
- [Usage](#usage)
    - [Install Dependencies](#install-dependencies)
    - [Run](#run)
    - [Test](#test)

## About
Twitter-like REST API using Node.js having functionalities:
- Authentication / Login
- Create / Read / Delete tweeets
- Reply to a tweet
- Follow / Unfollow users

## Requirements
- Node.js
- MongoDB

## Documentation
Check ...

## Usage
* Modify the configs in `config.js`. Make sure the mongodb instance is up and the database is created.
  There are three parameters to specify - JWT Signing Key, MongoDB database URL, and port.
- **Install dependencies**
    
    npm:
    ```
    npm install
    ```
    yarn:
    ```
    yarn install
    ```

- **Run**
    ```
    npm run start
    ```

- **Test**
    ```
    npm run test
    ```
