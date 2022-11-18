step - 1

- install all the dependencies using **yarn**.

step - 2

- Make sure you added your DB connection string to the .env file as DATABASE_URL then
- run **npx prisma migrate dev --name init** to sync the schema with the database and create the tables.

step - 3

- run **yarn dev** to start the server.
