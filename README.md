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
   `https://github.com/Munadil16/PrimeHaven.git`
2. Go to Project folder \
   `cd PrimeHaven`
3. Installing packages using npm \
   `npm install` or `npm i`

> use cd to move into respective directories (Client, Server) before installing
4. Setting up .env files
   - Client \
     `VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY=`
   - Server \
      `PG_CONN=`\
      `ACCESS_TOKEN_SECRET=SECRET`\
      `SMTP_EMAIL=`\
      `SMTP_PASS=`\
      `STRIPE_PRIVATE_KEY=`\
      `PORT=`
      
> [!NOTE]
> Get the VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY and STRIPE_PRIVATE_KEY from Stripe by creating an account. <br /><br />

> [!NOTE]
> Get the SMTP_EMAIL and SMTP_PASS from your Google Account -> Security -> 2-Step Verification -> App Passwords <br /><br />

> [!NOTE]
> Get the PG_CONN value from creating an account in [NeonDB](https://neon.tech/) or from any PostgreSQL Online Provider. After creating account, scroll down to get all queries and execute them before the next steps!

5. Create a folder named "uploads" in `Server/src/`
6. Start the Server (cd to Server Folder) \
   `npm start`
7. Run (in development mode; cd to Client folder) \
   `npm run dev`

## Queries for Database

> [!IMPORTANT]
> Execute the following Queries in your online PostgreSQL

### Create Tables

1. CREATE TABLE users(id integer, email varchar(40), username varchar(20), password varchar);
2. CREATE TABLE properties(id int, owner varchar(15), propImage varchar, propertyType varchar(10), state varchar(25), price int, title varchar(50), description varchar);
3. CREATE TABLE sold_properties(id int, owner varchar(15), propimage varchar, propertytype varchar(10), state varchar(25), price int, title varchar(50), description varchar, sold_to varchar(20));

> [!WARNING]
> Please note that currently there are no properties available for display. Kindly utilize the 'Sell Property Page' to add properties of your own for a better understanding."