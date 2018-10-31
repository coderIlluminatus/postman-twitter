# Assignment 4 - Twitter REST API Backend
## IIIT Allahabad - Sayantan Chatterjee - IIT2015511

### Postman collection

<a href="https://documenter.getpostman.com/view/2547817/RzZ3N3Ui" target="_blank">
    <img alt="Postman Collection" src="https://res.cloudinary.com/postman/image/upload/w_152,h_56,c_fit,f_auto,t_team_logo/v1/team/768118b36f06c94b0306958b980558e6915839447e859fe16906e29d683976f0" />
</a>

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
