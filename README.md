# Car Service Center

[![Build Status](https://travis-ci.com/SteveyPugs/car_service_center.svg?token=6QhuXtnoHM5ZuCi5iyJN&branch=master)](https://travis-ci.com/SteveyPugs/car_service_center)
A project the handles building the website for a car server center.

#### Preq(s)
1. Node.js / NPM
2. MySQL database

#### Local / Development Use

```bash
## terminal tab 1
npm install
cp server_config.example.js server_config.js 
## update config file with database values
node server.js

## terminal tab 2
cd client
npm install
npm start
```

#### Testing

```bash
npm test
```

#### Production