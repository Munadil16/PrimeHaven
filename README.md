## About the Project

PrimeHaven is a platform designed to facilitate seamless property transactions for users seeking to buy or sell properties such as houses, farmhouses, and flats. The primary objective behind the development of this project is to fulfill the requirements of my final year academics and to get the hands-on experience in the PERN Tech Stack.

## Built With

- [React JS](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Setup

1. Clone the repo into remote desktop \
   `git clone https://github.com/Munadil16/PrimeHaven.git`

2. Go to Project folder \
   `cd PrimeHaven`

3. Install packages \
   `npm install` \
   `bun install` \
   `yarn install`
> Install pkgs. in both Client and Server

4. Set up the .env files from the `.env.sample` file

5. Start the Server \
   `npm run start`
   
6. To run client \
   `npm run dev`

## Queries for Database

> [!IMPORTANT]
> Execute the following Queries in PostgreSQL DB

### Tables Required

1. CREATE TABLE users(id integer, email varchar(40), username varchar(20), password varchar);
2. CREATE TABLE properties(id int, owner varchar(15), propImage varchar, propertyType varchar(10), state varchar(25), price int, title varchar(50), description varchar);
3. CREATE TABLE sold_properties(id int, owner varchar(15), propimage varchar, propertytype varchar(10), state varchar(25), price int, title varchar(50), description varchar, sold_to varchar(20));

> [!WARNING]
> Please note that currently there are no properties available for display. Kindly utilize the 'Sell Property Page' to add properties of your own for a better understanding."